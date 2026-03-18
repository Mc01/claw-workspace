# 📜 ChamaFi — Smart Contract Architecture

## Overview

ChamaFi's smart contract system implements a **savings circle protocol** on Celo with three phases:

1. **Incubation** — Members pool stablecoins toward a shared capital target
2. **Graduation** — ERC-20 governance tokens are minted and distributed proportionally
3. **DeFi Integration** — Uniswap V4 pools with custom hooks channel idle assets into yield vaults

All contracts are written in **Solidity 0.8.26**, built with **Foundry**, and use **OpenZeppelin 5.x** + **Uniswap V4 Core**.

---

## Architecture Diagram

```
                        ┌───────────────────┐
                        │   User / MiniPay  │
                        └─────────┬─────────┘
                                  │
                    createChama() │ join() / contribute()
                                  ▼
┌─────────────────────────────────────────────────────────────┐
│                       ChamaFactory                          │
│  • EIP-1167 minimal proxy cloning                           │
│  • Global registry of all Chamas                            │
│  • Upgradeable implementation pointer                       │
│  • Deploys ChamaToken per Chama                             │
│                                                             │
│  createChama(params) → (chamaAddress, tokenAddress)         │
│  getAllChamas() → address[]                                  │
│  upgradeImplementation(newImpl) [onlyOwner]                  │
└──────────────────────────┬──────────────────────────────────┘
                           │ clone()
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   ChamaIncubation (Proxy)                   │
│  • Manages savings circle lifecycle                         │
│  • Member registration + contribution tracking              │
│  • Graduation: mints ChamaToken, distributes to members     │
│  • Refund: returns funds if deadline passes without target   │
│                                                             │
│  join()                   → register as member              │
│  contribute(amount)       → deposit stablecoins             │
│  graduate()               → mint token + distribute         │
│  refund()                 → reclaim if expired              │
│  getProgress()            → (current, target, percentage)   │
└──────────────────────────┬──────────────────────────────────┘
                           │ graduation
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      ChamaToken                             │
│  • ERC-20 + ERC20Permit + ERC20Votes                        │
│  • 1,000,000 total supply (minted once at graduation)       │
│  • Only ChamaIncubation can call mintSupply()               │
│  • Governance-ready: delegation + voting power              │
└─────────────────────────────────────────────────────────────┘

              ┌──────────────┐
              │  Post-Grad   │
              └──────┬───────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
┌──────────────────┐   ┌──────────────────┐
│ ChamaPoolManager │   │    AssetHook     │
│  (Uniswap V4)   │   │ (V4 Rehypothec.) │
│                  │   │                  │
│ createPool()     │   │ afterAddLiq →    │
│ seedLiquidity()  │   │   deposit yield  │
│ getPool()        │   │ beforeRemoveLiq →│
│                  │   │   withdraw yield │
│ IUnlockCallback  │   │ afterSwap →      │
│                  │   │   rehypothecate  │
└──────────────────┘   └────────┬─────────┘
                                │
                                ▼
                     ┌──────────────────┐
                     │FeatherYieldAdapter│
                     │  (ERC-4626)      │
                     │                  │
                     │ deposit(chamaId) │
                     │ withdraw(chamaId)│
                     │ withdrawAll()    │
                     │ claimYield()     │
                     │ balanceOf()      │
                     └──────────────────┘
                                │
                                ▼
                     ┌──────────────────┐
                     │  Feather Vault   │
                     │  (Morpho-based)  │
                     │  on Celo         │
                     └──────────────────┘
```

---

## Contract Details

### 1. ChamaFactory

**Purpose**: Deploy new ChamaIncubation instances via EIP-1167 minimal proxy clones. Maintains the global registry.

| Function | Access | Description |
|----------|--------|-------------|
| `createChama(params)` | Public | Clone incubation, deploy ChamaToken, initialize, register |
| `getAllChamas()` | View | Returns every Chama proxy address in creation order |
| `getChamaCount()` | View | Total number of Chamas ever created |
| `upgradeImplementation(newImpl)` | Owner | Point future clones at a new implementation |

**Key Design Decisions**:
- **EIP-1167 Minimal Proxies**: Each Chama costs ~$0.01 to deploy (vs $5+ for a full contract)
- **Token Symbol Derivation**: Automatically derives an uppercase symbol from the Chama name (max 8 chars)
- **Validation**: Enforces minimum 2 members, minimum 200 target capital, non-zero asset, non-empty name

**Events**:
```solidity
event ChamaCreated(uint256 indexed chamaId, address indexed incubation, address indexed creator, address asset, uint256 targetCapital, uint8 minMembers, string name);
event ImplementationUpgraded(address indexed oldImpl, address indexed newImpl);
```

---

### 2. ChamaIncubation

**Purpose**: Core savings circle logic — member management, contributions, graduation, and refunds.

| Function | Access | Description |
|----------|--------|-------------|
| `initialize(params, creator, token)` | Factory only | One-time initialization (proxy pattern) |
| `join()` | Public | Register as a member (max 100) |
| `contribute(amount)` | Members only | Deposit stablecoins (requires ERC-20 approval) |
| `graduate()` | Any member | Mint tokens + distribute when target reached |
| `refund()` | Members only | Reclaim contribution after deadline (if not graduated) |
| `getProgress()` | View | Returns `(current, target, percentage)` |
| `getMembers()` | View | Returns all member addresses |
| `getMemberContribution(addr)` | View | Returns a specific member's total contribution |
| `isMember(addr)` | View | Check membership |

**Lifecycle States**:
```
INCUBATING → GRADUATED (target met, tokens distributed)
INCUBATING → EXPIRED   (deadline passed, refunds available)
```

**Security**:
- `ReentrancyGuard` on all state-mutating functions
- `SafeERC20` for all token transfers
- Initializer pattern prevents re-initialization
- Max 100 members per Chama to bound gas costs

---

### 3. ChamaToken

**Purpose**: ERC-20 governance token for graduated Chamas.

| Property | Value |
|----------|-------|
| Total Supply | 1,000,000 tokens (18 decimals) |
| Standard | ERC-20 + ERC20Permit + ERC20Votes |
| Minting | One-time by ChamaIncubation at graduation |

**Governance Features**:
- **ERC20Votes**: Built-in delegation and voting power tracking
- **ERC20Permit**: Gasless approvals via EIP-2612 signatures
- **Immutable**: Once minted, no further tokens can be created

---

### 4. ChamaPoolManager

**Purpose**: Creates Uniswap V4 pools for graduated Chamas and seeds initial liquidity.

| Function | Access | Description |
|----------|--------|-------------|
| `createPool(token, asset, hook)` | Public | Initialize a V4 pool with custom hook |
| `seedLiquidity(poolId, tokenAmt, assetAmt)` | Public | Add full-range liquidity |
| `getPool(token, asset)` | View | Look up PoolId for a token/asset pair |

**V4 Integration Details**:
- Implements `IUnlockCallback` — all V4 mutations happen inside `unlock()` callbacks
- Initializes pools at `sqrtPrice = 1.0` (1 token = 1 asset unit)
- 0.3% LP fee, tick spacing = 60
- Full-range positions (min → max usable tick)
- Handles ERC-20 settlement and native CELO via `receive()`

---

### 5. FeatherYieldAdapter

**Purpose**: Wraps Feather (Morpho-based, ERC-4626) yield vaults on Celo. Tracks per-Chama positions.

| Function | Access | Description |
|----------|--------|-------------|
| `deposit(chamaId, amount)` | Authorized | Deposit assets into vault on behalf of a Chama |
| `withdraw(chamaId, amount)` | Authorized | Withdraw specific amount |
| `withdrawAll(chamaId)` | Authorized | Withdraw entire position |
| `claimYield(chamaId)` | Authorized | Extract only accrued yield (above principal) |
| `balanceOf(chamaId)` | View | Current balance including yield |
| `getPosition(chamaId)` | View | Returns `(shares, principal)` |

**Access Control**:
- Only **authorized callers** (ChamaIncubation contracts, hooks) can deposit/withdraw
- Owner can `authorizeCaller()` / `revokeCaller()`
- `Pausable` for emergency stops
- `ReentrancyGuard` on all mutative functions

**Yield Calculation**:
```
yield = vault.convertToAssets(position.shares) - position.principal
```

---

### 6. AssetHook (Base) + USDT_Hook / CELO_Hook

**Purpose**: Uniswap V4 hooks that rehypothecate idle liquidity into yield vaults.

| Hook | Trigger | Action |
|------|---------|--------|
| `afterAddLiquidity` | Member adds liquidity | Deposit contributed assets to yield vault |
| `beforeRemoveLiquidity` | Member exits | Withdraw from vault to cover exit |
| `afterSwap` | Token traded | Rehypothecate any excess assets |

**How Rehypothecation Works**:
1. When liquidity is added, the hook detects the asset amount from the `BalanceDelta`
2. It deposits those assets into the FeatherYieldAdapter on behalf of the Chama
3. Before liquidity removal, it withdraws from the vault to ensure instant exits
4. After swaps, any excess idle assets are swept back into the vault

---

## Interfaces

### IChamaIncubation
```solidity
struct ChamaParams {
    string  name;
    address asset;
    uint256 targetCapital;
    uint8   minMembers;
    uint256 deadline;
}

function initialize(ChamaParams calldata params, address creator_, address token_) external;
function name() external view returns (string memory);
function asset() external view returns (address);
function targetCapital() external view returns (uint256);
function creator() external view returns (address);
function chamaToken() external view returns (address);
```

### IYieldAdapter
```solidity
function deposit(bytes32 chamaId, uint256 amount) external returns (uint256 shares);
function withdraw(bytes32 chamaId, uint256 amount) external returns (uint256 withdrawn);
function withdrawAll(bytes32 chamaId) external returns (uint256 withdrawn);
function claimYield(bytes32 chamaId) external returns (uint256 yield);
function balanceOf(bytes32 chamaId) external view returns (uint256);
function asset() external view returns (address);
function vault() external view returns (address);
```

### IChamaPoolManager
```solidity
function createPool(address token, address asset, address hook) external returns (PoolId);
function seedLiquidity(PoolId poolId, uint256 tokenAmount, uint256 assetAmount) external payable;
function getPool(address token, address asset) external view returns (PoolId);
function poolManager() external view returns (address);
```

---

## Deployment Addresses

### Local Anvil Fork (Development)

| Contract | Address |
|----------|---------|
| MockCUSD (cUSD) | `0xca8c8688914e0f7096c920146cd0ad85cd7ae8b9` |
| ChamaIncubation (impl) | `0x5feaebfb4439f3516c74939a9d04e95afe82c4ae` |
| ChamaFactory | `0x976fcd02f7c4773dd89c309fbf55d5923b4c98a1` |
| MockERC4626Vault | `0x19ceccd6942ad38562ee10bafd44776ceb67e923` |
| FeatherYieldAdapter | `0xd42912755319665397ff090fbb63b1a31ae87cee` |
| MockPoolManager | `0xfcdb4564c18a9134002b9771816092c9693622e3` |
| ChamaPoolManager | `0x927b167526babb9be047421db732c663a0b77b11` |

### Test Chama (Created During Verification)

| Entity | Address |
|--------|---------|
| Chama Incubation Proxy | `0x02400e574d1f5f2fe05ee6945530647acc37b963` |
| Chama Token | `0x4ed577107b9eae6e4089cdda6b1b53a4dc155add` |

### Celo Mainnet Asset Addresses

| Token | Address | Decimals |
|-------|---------|----------|
| cUSD | `0x765DE816845861e75A25fCA122bb6898B8B1282a` | 18 |
| USDC | `0xceba9300f2b948710d2653dd7b07f33a8b32118c` | 6 |
| USDT | `0x48065fbBE25f71C928d2D4797C001d5E7a4111a8` | 6 |

### Celo Sepolia (Alfajores) Asset Addresses

| Token | Address | Decimals |
|-------|---------|----------|
| cUSD | `0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1` | 18 |

---

## Deployment Flow

### Deploy Order (as in `script/Deploy.s.sol`)

```
1. ChamaIncubation    — implementation contract (not initialized, used as clone target)
2. ChamaFactory       — takes incubation impl; deploys ChamaTokens via createChama()
3. MockERC4626Vault   — fake Feather vault (testnet only)
4. FeatherYieldAdapter — wraps the vault; owner = deployer
5. MockPoolManager    — V4 is not on Celo Sepolia (testnet only)
6. ChamaPoolManager   — wraps the pool manager
```

### Commands

```bash
# Local Anvil
make deploy-local

# Celo Sepolia (requires PRIVATE_KEY in .env)
make deploy-sepolia

# Celo Mainnet (5-second safety delay)
make deploy-mainnet

# Dry run (simulate without broadcasting)
make dry-run-sepolia
```

---

## Test Suite

**196/197 tests passing** across 10 test files (~4,000 lines of test code):

| Test File | Tests | Focus |
|-----------|-------|-------|
| `ChamaFactory.t.sol` | Factory creation, validation, registry |
| `ChamaIncubation.t.sol` | Lifecycle: join, contribute, graduate, refund |
| `ChamaToken.t.sol` | ERC-20 minting, votes, access control |
| `ChamaPoolManager.t.sol` | V4 pool creation, liquidity seeding |
| `FeatherYieldAdapter.t.sol` | Vault deposit/withdraw/yield, authorization |
| `AssetHook.t.sol` | Rehypothecation hooks on liquidity events |
| `EndToEnd.t.sol` | Full lifecycle: create → join → contribute → graduate |
| `ExitScenarios.t.sol` | Refund paths, edge cases, partial exits |
| `FullProtocol.t.sol` | Complete protocol flow with yield integration |

```bash
# Run all tests
forge test

# Run with full traces
forge test -vvvv

# Run specific test file
forge test --match-path test/ChamaFactory.t.sol

# Gas report
make test-gas
```

---

## Security Considerations

| Measure | Implementation |
|---------|---------------|
| **Reentrancy Protection** | `ReentrancyGuard` on ChamaIncubation, ChamaPoolManager, FeatherYieldAdapter |
| **Safe Transfers** | `SafeERC20` everywhere — handles non-standard ERC-20 returns |
| **Access Control** | Authorized callers for yield adapter; `onlyOwner` for admin functions |
| **Initializer Guard** | Proxy clones can only be initialized once |
| **Division by Zero** | Explicit guard in `FeatherYieldAdapter.withdraw()` (H-05 fix) |
| **Member Cap** | Max 100 members per Chama to bound gas costs |
| **Deadline Enforcement** | Contributions rejected after deadline; refunds available after expiry |
| **Pausable** | FeatherYieldAdapter can be paused in emergencies |

---

## Upgrade Path

- **ChamaFactory** can point to a new `ChamaIncubation` implementation via `upgradeImplementation()`
- Existing Chama proxies are **not affected** — they continue delegating to their original implementation
- New Chamas created after the upgrade use the new implementation
- **MockPoolManager** and **MockERC4626Vault** are testnet placeholders — swap for real Uniswap V4 PoolManager and Feather vault addresses on mainnet

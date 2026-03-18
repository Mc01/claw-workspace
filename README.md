<p align="center">
  <h1 align="center">🌱 ChamaFi</h1>
  <p align="center"><strong>Save Together, Grow Together</strong></p>
  <p align="center">
    Community savings circles powered by smart contracts on Celo.<br/>
    Pool funds with friends, reach targets together, and graduate to DeFi yield.
  </p>
</p>

<p align="center">
  <a href="https://chamafi-hybrid-3.vercel.app">🌐 Live App</a> •
  <a href="./CONTRACTS.md">📜 Contracts</a> •
  <a href="./FRONTEND.md">💻 Frontend</a> •
  <a href="./DEMO.md">🎬 Demo Script</a>
</p>

---

## What is ChamaFi?

**ChamaFi** digitizes Africa's most powerful financial tradition — **savings circles** (known as *Chamas* in Kenya, *Ajo* in Nigeria, *Stokvels* in South Africa) — and supercharges them with DeFi yield on the **Celo blockchain**.

> **$50B+/year** flows through informal savings circles in Africa. Zero is on-chain. ChamaFi changes that.

### The Problem

- **143M+ idle stablecoins** on Celo earning nothing
- 12M+ MiniPay wallets with **no savings/lending products**
- Savings circles rely on trust, paper records, and cash — vulnerable to fraud and mismanagement
- DeFi is too complex for most MiniPay users

### The Solution

Each ChamaFi savings circle is a **mini-economy**:

1. **Incubate** — Members pool stablecoins toward a shared target (pump.fun-style)
2. **Graduate** — Upon reaching the target, an ERC-20 governance token is minted and distributed proportionally
3. **Grow** — Post-graduation, idle assets flow to Feather (Morpho-based) yield vaults via Uniswap V4 hooks

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        ChamaFi Protocol                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐     ┌──────────────────┐     ┌────────────┐  │
│  │ ChamaFactory │────▶│ ChamaIncubation  │────▶│ ChamaToken │  │
│  │  (Registry)  │     │  (EIP-1167 Proxy)│     │ (ERC20 +   │  │
│  │              │     │                  │     │  Votes)    │  │
│  └──────────────┘     └────────┬─────────┘     └────────────┘  │
│                                │ graduation                     │
│                                ▼                                │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │ ChamaPoolManager │  │  AssetHook       │  │  Feather     │  │
│  │  (Uniswap V4)    │  │  (USDT/CELO)     │  │  YieldAdapter│  │
│  │                   │  │  Rehypothecation  │  │  (ERC-4626)  │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                        Frontend (Vite + React)                  │
│  Landing • Discover • Create • Detail • My Chamas               │
│  wagmi + viem + RainbowKit • Celo Mainnet & Alfajores           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| 🏦 **Savings Circles** | Create and join community savings pools with target amounts and deadlines |
| 🎓 **Graduation Mechanic** | When the target is reached, a governance token (ERC-20 + ERC20Votes) is minted and distributed proportionally to contributors |
| 🏭 **Factory Pattern** | EIP-1167 minimal proxy clones for gas-efficient deployment (~$0.01 per Chama) |
| 🔄 **Yield Hooks** | Uniswap V4 hooks that rehypothecate idle stablecoins into Feather (Morpho) vaults |
| 💰 **Multi-Asset** | Supports cUSD, USDC, USDT, and CELO as savings assets |
| ⛽ **Fee Abstraction** | Pay gas in stablecoins — no CELO needed (Celo native feature) |
| 🛡️ **Safety** | ReentrancyGuard, SafeERC20, access control, deadline enforcement, refund mechanism |
| 📱 **Multi-Surface** | Web App, MiniPay MiniApp (12M+ wallets), Farcaster Mini App |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Smart Contracts** | Solidity 0.8.26, Foundry, OpenZeppelin 5.x, Uniswap V4 Core |
| **Frontend** | Vite, React 18, TypeScript, Tailwind CSS, wagmi v2, viem v2, RainbowKit |
| **Blockchain** | Celo (EVM L2, sub-cent fees, fee abstraction) |
| **Yield** | Feather Vaults (Morpho-based, ERC-4626 on Celo) |
| **DEX** | Uniswap V4 with custom hooks |
| **Deployment** | Vercel (frontend), Foundry scripts (contracts) |

---

## Contract Addresses (Local Anvil Fork)

| Contract | Address |
|----------|---------|
| ChamaIncubation (impl) | `0x5feaebfb4439f3516c74939a9d04e95afe82c4ae` |
| ChamaFactory | `0x976fcd02f7c4773dd89c309fbf55d5923b4c98a1` |
| FeatherYieldAdapter | `0xd42912755319665397ff090fbb63b1a31ae87cee` |
| ChamaPoolManager | `0x927b167526babb9be047421db732c663a0b77b11` |
| MockERC4626Vault | `0x19ceccd6942ad38562ee10bafd44776ceb67e923` |
| MockPoolManager | `0xfcdb4564c18a9134002b9771816092c9693622e3` |

> See [CONTRACTS.md](./CONTRACTS.md) for full architecture details, interfaces, and deployment flow.

---

## Quick Start

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation) (forge, anvil)
- [Node.js](https://nodejs.org/) v18+
- [Git](https://git-scm.com/)

### Smart Contracts

```bash
cd chamafi-contracts

# Install dependencies
forge install

# Build
forge build

# Run tests (196/197 passing)
forge test

# Deploy locally
make anvil          # Terminal 1: start local chain
make deploy-local   # Terminal 2: deploy contracts

# Deploy to Celo Sepolia
cp .env.example .env  # fill in PRIVATE_KEY & CELOSCAN_API_KEY
make deploy-sepolia
```

### Frontend

```bash
cd chamafi-hybrid-3

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local  # fill in values

# Run dev server
npm run dev

# Build for production
npm run build
```

> See [FRONTEND.md](./FRONTEND.md) for complete setup instructions.

---

## How It Works

### 1. Create a Chama (Incubation Phase)

A creator deploys a new savings circle via `ChamaFactory.createChama()`:
- **Name** — Human-readable identifier
- **Asset** — The stablecoin for savings (cUSD, USDC, USDT, or CELO)
- **Target Capital** — Minimum 200 tokens to graduate
- **Min Members** — Minimum 2 members required
- **Deadline** — Optional deadline for the incubation period

### 2. Join & Contribute

Members join the Chama and contribute stablecoins:
- `join()` — Register as a member
- `contribute(amount)` — Deposit stablecoins toward the target
- Contributions are tracked per-member with real-time progress

### 3. Graduate

When `totalContributed >= targetCapital`:
- A **ChamaToken** (ERC-20 + ERC20Votes) is minted — 1,000,000 tokens total supply
- Tokens are distributed proportionally to each member's contribution
- The Chama transitions from incubation to an active economy

### 4. Refund (Safety Net)

If the deadline passes without reaching the target:
- Every member can call `refund()` to reclaim their full contribution
- No funds are lost — the smart contract guarantees this

---

## Project Structure

```
chamafi/
├── chamafi-contracts/          # Smart contracts (Foundry)
│   ├── src/
│   │   ├── ChamaFactory.sol        # Factory + registry (EIP-1167 clones)
│   │   ├── ChamaIncubation.sol     # Savings circle logic
│   │   ├── ChamaToken.sol          # ERC-20 + ERC20Votes governance token
│   │   ├── ChamaPoolManager.sol    # Uniswap V4 pool management
│   │   ├── FeatherYieldAdapter.sol  # ERC-4626 yield vault adapter
│   │   ├── hooks/
│   │   │   ├── AssetHook.sol        # Base V4 hook (rehypothecation engine)
│   │   │   ├── USDT_Hook.sol        # USDT-specific hook
│   │   │   └── CELO_Hook.sol        # CELO-specific hook
│   │   ├── interfaces/              # Contract interfaces
│   │   └── mocks/                   # Test mocks (ERC4626, PoolManager)
│   ├── test/                        # 196+ tests (unit + integration)
│   ├── script/                      # Deployment scripts
│   └── Makefile                     # Build/test/deploy commands
│
├── chamafi-hybrid-3/           # Frontend (Vite + React + Tailwind)
│   ├── src/
│   │   ├── pages/                   # Landing, Discover, Create, Detail, MyChamas
│   │   ├── components/              # Reusable UI components
│   │   ├── hooks/                   # React hooks for contract interaction
│   │   ├── abi/                     # Contract ABIs
│   │   ├── config/                  # Wagmi config, contract addresses
│   │   └── lib/                     # Utility functions
│   └── vercel.json                  # Deployment config
│
├── marketing/                  # Marketing materials
├── CONTRACTS.md                # Contract architecture documentation
├── FRONTEND.md                 # Frontend setup documentation
├── DEMO.md                     # Demo script for judges
└── PLAN.md                     # Product plan & research
```

---

## Testing

### Smart Contracts — 196/197 tests passing

```bash
cd chamafi-contracts
forge test -vvv
```

Test coverage includes:
- **ChamaFactory** — Creation, validation, registry, implementation upgrade
- **ChamaIncubation** — Join, contribute, graduate, refund, edge cases
- **ChamaToken** — Minting, governance votes, access control
- **ChamaPoolManager** — Pool creation, liquidity seeding, V4 unlock callback
- **FeatherYieldAdapter** — Deposit, withdraw, yield claiming, authorization
- **AssetHook** — Rehypothecation on add/remove liquidity and swaps
- **Integration** — End-to-end flows, exit scenarios, full protocol lifecycle

---

## Celo Ecosystem Alignment

ChamaFi is built **exclusively for Celo** and leverages unique platform features:

| Celo Feature | ChamaFi Usage |
|-------------|---------------|
| **15 Stablecoins** | Multi-asset savings (cUSD, USDC, USDT, KESm, NGNm, GHSm) |
| **Fee Abstraction** | Users pay gas in stablecoins — zero CELO needed |
| **Sub-cent Fees** | Creating a Chama costs ~$0.01 (EIP-1167 clones) |
| **MiniPay (12M+ wallets)** | Primary distribution channel across 66+ countries |
| **SocialConnect** | Phone number → wallet mapping for circle invitations |

---

## Market Opportunity

| Country | Savings Circle | Market Size |
|---------|---------------|-------------|
| 🇰🇪 Kenya | Chama | 300K+ groups, $4B+ managed |
| 🇳🇬 Nigeria | Ajo/Esusu | 50%+ of informal workers |
| 🇿🇦 South Africa | Stokvel | R50B+/year ($2.7B), 11M participants |
| 🌍 West Africa | Tontine/Susu | Widespread across the region |

**Total addressable market: $50B+/year** with zero on-chain penetration today.

---

## License

MIT

---

<p align="center">
  Built with 💚 for the Celo ecosystem
</p>

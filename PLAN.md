# ChamaFi — Chamas That Grow

> Powered by Commonwealth Protocol

**Tagline**: Save together, grow together.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Research Findings](#2-research-findings)
3. [Product Concept](#3-product-concept)
4. [Lifecycle](#4-lifecycle)
5. [Technical Architecture](#5-technical-architecture)
6. [Yield Strategy](#6-yield-strategy)
7. [Surfaces & User Journeys](#7-surfaces--user-journeys)
8. [Viral Mechanics](#8-viral-mechanics)
9. [Competition Analysis](#9-competition-analysis)
10. [Ecosystem Alignment & Grants](#10-ecosystem-alignment--grants)
11. [Risk Assessment](#11-risk-assessment)
12. [Roadmap](#12-roadmap) — Phases aligned with Openclaw team (AGENTS.md):
    - Phase 1: Brainstorming [COMPLETE]
    - Phase 2: Concept (Website + Smart Contracts)
    - Phase 3: Expansion (MiniApps + Farcaster + AI Agent)
    - Phase 4: Distribution (Marketing + Store Submissions + Growth)
    - Phase 5: Demo (Showcase + Materials)

---

## 1. Executive Summary

**ChamaFi** digitizes Africa's most powerful financial tradition — savings circles (Chamas) — and supercharges them with DeFi yield via the **Commonwealth Protocol**.

Each Chama is a mini-economy:
- Members gather during an **incubation phase** (pump.fun-style)
- Upon graduation, an **ERC20 token** is minted and deployed to a **Uniswap V4 pool** with custom hooks
- The V4 hooks **rehypothecate** all idle stablecoins into **Feather** (Morpho-based) yield vaults on Celo
- Token holders earn from: vault yield (passive price appreciation) + LP yield (active) + token inflation
- The Chama operates with **on-chain governance** — proposals, voting, treasury management
- An **AI agent** (ERC-8004) manages each Chama: auto-compounds, sends reminders, optimizes yield

**Distribution**: MiniPay MiniApps (12M+ wallets in Africa) + Farcaster Mini App + Web App

**Market**: $50B+/year informal savings circles (Chamas/Ajo/Stokvels) in Africa with zero on-chain penetration.

---

## 2. Research Findings

### 2.1 The Idle Stablecoin Gap

| Metric | Value |
|--------|-------|
| Celo stablecoins market cap | **$171M** |
| Celo DeFi TVL | **$27.5M** |
| Idle stablecoins not earning | **~$143M** |

USDT dominates at 77%. Most stablecoins sit in wallets unused because DeFi is too complex for MiniPay's user base.

### 2.2 MiniPay — The Distribution Channel

| Metric | Value |
|--------|-------|
| Wallet activations | **12M+** across 66+ countries |
| Transactions processed | **380M+** |
| Daily active addresses | **700K+** (#1 Ethereum L2 by DAU) |
| Monthly Mini App opens | **20M+** |
| Live Mini Apps | **40+** |
| #1 unmet user need | **Savings + Credit** (29.4% of users) |

MiniPay topped Google Play Store in Kenya (ahead of Facebook/WhatsApp). Zero lending/savings products existed in the MiniApp store until Kiln launched Feb 23, 2026 (individual USDT yield via Aave).

### 2.3 Africa's Savings Circle Culture

| Country | Name | Market Size |
|---------|------|-------------|
| Kenya | **Chama** | 300K+ groups, $4B+ managed |
| Nigeria | **Ajo/Esusu** | 50%+ of informal workers participate |
| South Africa | **Stokvel** | R50B+/year ($2.7B), 11M participants |
| West Africa | **Tontine/Susu** | Widespread |

**No on-chain version exists** despite being Africa's #1 informal financial institution. Previous attempt (HaloFi/GoodGhosting on Celo) was **archived Nov 2024** — validates concept, zero competition.

### 2.4 DeFi on Celo — Protocol Landscape

| Protocol | TVL | Notes |
|----------|-----|-------|
| Aave V3 | $11M | Largest. USDT/USDC/WETH. APYs: 0.01-1.06% |
| Uniswap V3 | $5.5M | Most active DEX. CELO/stCELO 10.93% APY |
| Mento | $5M | **15 stablecoins**: KESm, NGNm, GHSm, ZARm, XOFm + more |
| Velodrome V3 | $323K | #1 by volume (ve(3,3) incentives) |
| Carbon DeFi | $1.7M | #1 fee generator ($670/day) |
| Feather (Merkl) | $569K | FEATHERUSDT 5.03% APY, FEATHERCELO 4.10% |
| Radical (martinvol) | New | USDC/USDT auto-compound on Uniswap. Web only. ~8% APY |

**Critical gap**: No savings rate for local-currency stablecoins (cKES, cNGN, cGHS).

### 2.5 Celo's Unique Stack

| Feature | Details |
|---------|---------|
| **15 stablecoins** | KESm, NGNm, GHSm, ZARm, XOFm, cUSD, cEUR, cREAL, cCOP, PUSO + more |
| **Fee abstraction** | Pay gas in stablecoins. No CELO needed. |
| **ERC-8004** | Agent identity + reputation — deployed on mainnet |
| **x402** | HTTP 402 micropayments for AI agents |
| **Celo MCP Server** | Model Context Protocol for AI assistants |
| **Phone mapping** | SocialConnect: phone number -> wallet address |
| **Sub-cent fees** | ~$0.001 per transaction |

No other L2 has this combination. ChamaFi **cannot be replicated on Base or Arbitrum** (no local stablecoins, no phone mapping, no ERC-8004).

### 2.6 Farcaster Integration

- Celo (chain 42220) is **natively supported** in Farcaster Mini Apps
- SDK actions: `composeCast()`, `addMiniApp()`, `sendToken()`, `swapToken()`
- **EIP-5792 batch transactions**: approve + swap in one confirmation
- **Push notifications**: 100/day per user
- **Developer Rewards**: auto-eligible for weekly Warpcast rewards
- Permissionless publishing (no app store review)

### 2.7 MiniPay Technical Constraints

| Constraint | Detail |
|-----------|--------|
| **No SDK package** | Use viem v2+ / wagmi v3 with `window.ethereum` injection |
| **Auto-connect required** | No connect button (top rejection reason) |
| **Legacy transactions only** | EIP-1559 ignored |
| **Celo only** | Chain 42220 (mainnet) + 11142220 (Sepolia) |
| **No push notifications** | No native notification API |
| **No message signing for auth** | Docs explicitly forbid |
| **Listing requires** | HTTPS, auto-connect, PageSpeed, verified contracts, support link, ToS |
| **SLA** | Critical issues fixed within 24h or listing disabled |

### 2.8 African Financial Behavior

| What Users Think | What We Build |
|-----------------|---------------|
| "Protect my money from inflation" | Stablecoin savings (cUSD = instant hedge) |
| "Save but can't discipline myself" | Savings circles with social accountability |
| "Get a loan without a bank" | Rotating payouts (ROSCA = credit access) |
| "Send money to family abroad" | Cross-border via local stablecoins |

Key data:
- **81% of Nigerian MiniPay users** value stablecoins for currency protection
- Nigeria inflation: 18-33%. Kenya: ~5%. Ghana: ~12%
- M-Shwari (Kenya): 30M accounts at 3-4% APY (negative real return)
- Piggyvest (Nigeria): 6M users, up to 19.5% locked savings
- Even **0% yield in cUSD beats -20% real return in Naira**

### 2.9 Viral Patterns That Work in Crypto

| Pattern | Example | Mechanism |
|---------|---------|-----------|
| **Inherent N-player requirement** | Friend.tech, Chamas | You NEED others to participate |
| **Bonding curve price signal** | pump.fun, DEGEN | Visible, shareable price chart |
| **Daily ritual + streak** | DEGEN allowance | Loss aversion > reward |
| **Shareable achievement cards** | Polymarket | Every action = content |
| **Ongoing referral rewards** | Blast | % of referee's ongoing activity |
| **Geographic density** | M-Pesa | Target cities, not countries |
| **Feed-native distribution** | Farcaster Mini Apps | Embed -> interact -> share -> viral loop |

### 2.10 Ecosystem Grants & Funding

| Program | Status | Amount | Requirements |
|---------|--------|--------|-------------|
| **Prezenti Anchor** | Open NOW | $290K budget | 10K+ daily txs for Stage 2 (~$25K) |
| **Celo Camp Batch 10** | Open NOW | $100K investment pool | Apply at f6s.com |
| **Verda Ventures** | Active | $40M fund | MiniPay builders |
| **Proof-of-Ship** | Monthly | Variable | Ship on Celo mainnet |

Season 2 mandate: Everything subordinated to **growing Transactions + TVL**.

---

## 3. Product Concept

### ChamaFi x Commonwealth Protocol

Each Chama savings circle IS a **Commonwealth** — a mini-economy with:

1. **Its own ERC20 token** — backed by stablecoins or CELO, with P12YN bonding curve pricing
2. **A Uniswap V4 pool** — ChamaToken / stablecoin pair with custom rehypothecation hooks
3. **Yield generation** — all idle stablecoins flow to Feather vault via V4 hooks
4. **On-chain governance** — token = vote, proposals, treasury management
5. **AI agent manager** — ERC-8004 identity, auto-compounds, sends reminders, optimizes

### The Three Yield Sources

| Source | Mechanism | Who Benefits |
|--------|-----------|-------------|
| **Buy USDC yield** | Vault compounds -> token price rises | All token holders (passive) |
| **LP USDC yield** | Vault compounds -> distributed on LP exit | Active contributors |
| **Token inflation** | New tokens minted at vault APY rate for LPs | Active contributors |

### Commonwealth Protocol (from github.com/Mc01/v4)

The bonding curve and rehypothecation model is based on the Commonwealth protocol research:

- **P12YN model** (Polynomial n=1.2) selected as optimal after testing 6 curve types x 24 configurations
- **Price**: `P_0 * (1 + k * supply^1.2)` — gentle growth, fair for late joiners, rewards early members
- **Yield -> Price = Yes** — vault compounding grows `buy_usdc_with_yield`, pushing token price up passively
- **LP -> Price = No** — adding/removing liquidity is price-neutral (safe for contributors)
- **Token inflation** — LPs earn minted tokens at vault APY rate
- **Fair share scaling** — prevents bank runs, proportional withdrawal limits
- **434 Python simulation tests** validated the math across whale, bank-run, and stochastic scenarios

---

## 4. Lifecycle

### Phase 1: INCUBATION (pump.fun-style)

**Goal**: Gather members and capital. No token, no yield.

1. **Creator** starts a Chama:
   - Name, description
   - Backing asset: cUSD / USDT / USDC / KESm / NGNm / CELO
   - Target: members (5-20) + capital (e.g., $500)
   - Deadline: 14-30 days
   - Post-graduation contribution schedule (weekly/biweekly/monthly)

2. **Members commit** stablecoins to escrow contract:
   - On-chain commitment receipt (address, amount, timestamp)
   - **No ERC20 token yet**
   - Capital in escrow, **NOT earning yield** (simplicity, legal clarity, FOMO to fill fast)
   - Progress bar: `$320 / $500, 8/10 members`

3. **Social pressure builds**:
   - Share invite link via phone (SocialConnect) or Farcaster
   - "My Chama needs 2 more members and $180 to launch!"

4. **Failure mode**: Deadline passes without target -> all commitments refunded. Sub-cent gas cost.

### Phase 2: GRADUATION

**Goal**: Birth of the Chama economy. Single atomic transaction:

1. Mint **ChamaToken** (ERC20 + ERC20Votes governance)
2. Create **Uniswap V4 pool** (ChamaToken / stablecoin) with **ChamaHook**
3. Seed **initial liquidity** from escrow funds
4. Members receive **tokens proportional to commitment**
5. **ChamaHook activates** -> stablecoins -> Feather vault -> yield begins

**The graduation moment is inherently viral**: "My Chama just graduated! Token: $0.01 -> join us!"

### Phase 3: CHAMA OPERATION

**Goal**: Ongoing savings, yield, governance, growth.

- **New members join** by buying tokens on V4 pool (open market)
- **Existing members contribute** by adding liquidity (price-neutral)
- **Yield generates** via ChamaHook rehypothecation to Feather vault
- **Token appreciates** from vault compounding + new member demand
- **Governance**: token holders vote on strategy, membership, parameters
- **Rotating payouts** (optional ROSCA) or free-form treasury management
- **Federation**: multiple Chamas can share reputation and lend inter-circle

### Governance Capabilities

| Action | Voting Threshold |
|--------|-----------------|
| Accept/reject new member | >50% simple majority |
| Change yield strategy | >66% super majority |
| Adjust contribution schedule | >50% |
| Initiate rotating payout | >50% |
| Emergency withdrawal (circuit breaker) | >75% |
| Federate with another Chama | >66% |

---

## 5. Technical Architecture

### Smart Contracts

```
ChamaFactory.sol           -- Deploy incubations + graduate to ERC20 + V4 pool
  |-- createIncubation(name, asset, targetMembers, targetCapital, deadline)
  |-- graduate(incubationId) -- atomic: mint token + create pool + seed liquidity
  '-- Registered in ChamaRegistry for discovery

Incubation.sol (per Chama, pre-graduation)
  |-- commit(amount) -- accept member commitment
  |-- withdraw() -- refund if deadline passed
  |-- progress() -- view (memberCount, capitalRaised, target, deadline)
  '-- graduationReady() -- bool

ChamaToken.sol (per Chama, post-graduation)
  |-- ERC20 + ERC20Votes (governance)
  |-- Minted during graduation proportional to commitments
  '-- New tokens minted via token inflation for LPs

ChamaHook.sol (Uniswap V4 hook, per Chama)
  |-- afterSwap -> rehypothecate excess stablecoins to Feather vault
  |-- afterAddLiquidity -> deposit contributed stablecoins to vault
  |-- beforeRemoveLiquidity -> withdraw from vault for exits (MUST BE INSTANT)
  |-- compound() -> called by AI agent, rebalances vault
  '-- Yield adapter: pluggable interface (Feather primary)

ChamaGovernance.sol (per Chama, post-graduation)
  |-- propose(type, params) -- create governance proposal
  |-- vote(proposalId, support) -- cast vote
  |-- execute(proposalId) -- execute after timelock
  '-- Phase-gated capabilities

ChamaRegistry.sol (singleton)
  |-- All Chamas registered for discovery
  |-- Federation tracking
  |-- Reputation aggregation (ERC-8004)
  '-- Public API for browsing

AgentManager.sol (singleton)
  |-- ERC-8004 agent identity NFT
  |-- Session key (ERC-7579) for auto-compounding
  |-- x402 endpoint for premium analytics
  '-- MCP server registration
```

### V4 Hook — Rehypothecation Engine

```solidity
// ChamaHook.sol — Key hooks

function afterSwap(...) external override {
    // Someone bought/sold Chama tokens
    // Deposit excess stablecoins into Feather vault
    uint256 idle = getIdleBalance(key);
    if (idle > MINIMUM_DEPOSIT) {
        yieldAdapter.deposit(stablecoin, idle);
    }
}

function afterAddLiquidity(...) external override {
    // Member contributed -> deposit stablecoins to vault
    uint256 contributed = getContributedAmount(delta);
    yieldAdapter.deposit(stablecoin, contributed);
}

function beforeRemoveLiquidity(...) external override {
    // Member exiting -> withdraw from vault INSTANTLY
    uint256 needed = calculateNeeded(params);
    require(yieldAdapter.canWithdrawInstantly(stablecoin, needed), "Vault locked");
    yieldAdapter.withdraw(stablecoin, needed);
}
```

### Vault Adapter Interface

```solidity
interface IYieldAdapter {
    /// @notice Deposit. MUST be instant.
    function deposit(address token, uint256 amount) external returns (uint256 shares);

    /// @notice Withdraw. MUST be instant, NO timelock.
    function withdraw(address token, uint256 amount) external returns (uint256 received);

    /// @notice Current balance including accrued yield
    function balance(address token) external view returns (uint256);

    /// @notice Check if withdrawal can execute instantly
    function canWithdrawInstantly(address token, uint256 amount) external view returns (bool);
}
```

### P12YN Bonding Curve (Solidity)

```solidity
// price(supply) = P0 * (1 + k * supply^1.2)
function price(uint256 supply) public view returns (uint256) {
    uint256 sToN = FixedPointMathLib.rpow(supply, 12e17, 1e18); // s^1.2
    return P0 + P0 * k * sToN / 1e18;
}

// Cost to buy from supplyA to supplyB:
// integral = P0*(b-a) + P0*k*(b^2.2 - a^2.2) / 2.2
function buyCost(uint256 a, uint256 b) public view returns (uint256) {
    uint256 span = b - a;
    uint256 bPow = FixedPointMathLib.rpow(b, 22e17, 1e18); // b^2.2
    uint256 aPow = FixedPointMathLib.rpow(a, 22e17, 1e18); // a^2.2
    return P0 * span / 1e18 + P0 * k * (bPow - aPow) / (22e17);
}
```

### Multi-Surface Frontend

```
Next.js App (Vercel):
  /                       -- Landing: "Your Chama, Your Commonwealth"
  /incubate               -- Create new Chama
  /incubate/[id]          -- Progress, commit, share
  /chama/[id]             -- Dashboard: token price, TVL, members, yield
  /chama/[id]/govern      -- Proposals, voting, execution
  /chama/[id]/treasury    -- Yield breakdown, strategy, analytics
  /discover               -- Browse public Chamas
  /profile                -- Your Chamas, tokens, yield, reputation
  /api + /llms.txt        -- REST API + MCP for AI agents
  /.well-known/farcaster.json -- Farcaster manifest

Surface detection:
  window.ethereum?.isMiniPay -> MiniPay (simplified, auto-connect)
  Farcaster SDK context      -> Farcaster (social features)
  Default                    -> Web (full dashboard)

Tech stack: viem v2 + wagmi v3 + React 19 + Tailwind + TypeScript
```

---

## 6. Yield Strategy

### Primary: V4 Hook + Feather (Morpho-based on Celo)

| Pool | APY | TVL |
|------|-----|-----|
| FEATHERUSDT | 5.03% | $362K |
| FEATHERCELO | 4.10% | $207K |
| + Merkl incentives | +1-3% boost | |

### Critical Requirement: NO TIMELOCK ON WITHDRAWAL

The ChamaHook's `beforeRemoveLiquidity` MUST withdraw stablecoins INSTANTLY from the vault. If the vault has a timelock/delay/redemption queue, the hook fails and members cannot exit.

**Before integration, MUST verify**:
- Feather supports instant deposit
- Feather supports instant withdrawal (no lock, no delay, no queue)
- Feather has sufficient liquidity for withdrawal at any time

**Fallback options if Feather has withdrawal friction**:
- Option A: Liquidity buffer (20% in pool, 80% in vault)
- Option B: Alternative Celo yield source (Midas RWA, Uniswap V3 LP)
- Option C: Hybrid (Feather majority, liquidity buffer as instant backstop)

### Achievable Yield Stack

```
Base:  Feather vault                   ~5% APY
+ Merkl incentives                     +1-3% APY
+ Token inflation for LPs             +5% APY (in Chama tokens)
+ Token price appreciation            (from new member demand)
-----------------------------------------------
Total: ~11-13%+ effective APY
```

This beats:
- M-Shwari: 3-4% (negative real return in Kenya)
- Piggyvest locked: up to 19.5% (custodial, opaque)
- TryHold: ~25% (unsustainable treasury-funded)
- Kiln Earn: ~0.66% (Aave USDT only)
- Bank savings in Nigeria: 8-12% (vs. 18-33% inflation)

### Yield Provider Comparison

| Provider | On Celo? | APY | Instant Withdraw? | Notes |
|----------|----------|-----|-------------------|-------|
| **Feather** | Yes | ~5% | **TBD - must verify** | Primary target |
| **Uniswap V3 LP** | Yes | 3-11% | Yes | Requires management |

---

## 7. Surfaces & User Journeys

### Web App — `chamafi.xyz` (Full Lifecycle)

The complete experience for Chama creators, managers, and power users.

| Page | Phase | Purpose |
|------|-------|---------|
| `/incubate` | Incubation | Create new Chama, set parameters, generate invite link |
| `/incubate/[id]` | Incubation | Progress page, commit capital, share, countdown timer |
| `/chama/[id]` | Chama | Dashboard: token price chart, TVL, members, yield earned |
| `/chama/[id]/govern` | Chama | Proposals, voting, execution history |
| `/chama/[id]/treasury` | Chama | Yield breakdown, strategy allocation, analytics |
| `/discover` | All | Browse public Chamas by region, asset, performance |
| `/profile` | All | Your Chamas, tokens, yield earned, reputation score |

### MiniApp: "Chamas: Incubate" (Opera MiniPay)

Single-purpose MiniApp covering the creation + joining + tracking lifecycle.

**User Journey A — Create**:
1. Open -> "Start a Chama" button
2. Name, backing asset, target members + capital, deadline -> confirm
3. Share invite link via phone contacts (SocialConnect)
4. Track progress: members joining, capital filling up

**User Journey B — Join**:
1. Open -> see Chamas your friends started (SocialConnect phone lookup)
2. Browse: progress bars, member counts, deadlines
3. Tap -> "Commit KESm 5,000" -> one transaction -> done
4. Track progress until graduation

**User Journey C — Track**:
1. Open -> see your incubating Chamas
2. Progress bar: `8/10 members, $380/$500`
3. Notification when graduated: "Your Chama launched!"

**Surface**: Cards with progress bars. Big commit buttons. Phone-number invites. No scrolling needed.

### MiniApp: "Chamas: Govern" (Opera MiniPay)

Post-graduation governance + daily interaction.

**User Journey**:
1. Open -> see active proposals across your Chamas
2. Each proposal: title, description, current votes, deadline
3. Tap -> read details -> Vote (For / Against) -> transaction -> done
4. Quick view: your Chamas' token prices + yield earned
5. Contribute (add liquidity to existing Chama)
6. Claim rotating payout (if it's your turn)

**Surface**: Proposal feed. One-tap vote. Quick-stats header showing token prices.

### Farcaster Mini App: "ChamaFi"

Social layer for crypto-native distribution.

**Features**:
- View your Chamas: token prices, yield, members
- Share Chama card as cast embed (dynamic OG image: name, members, APY, token chart)
- `composeCast` at graduation: "My Chama just graduated! Token: $0.01"
- Leaderboards: Top Chamas by yield, growth, members (weekly)
- Push notifications (100/day): "Your Chama token is up 5%", "New proposal"

**Viral loop**: See embed in feed -> tap -> view Chama -> join or create own -> share -> repeat

### Surface x Phase Matrix

| Phase | Web App | Chamas: Incubate | Chamas: Govern | Farcaster |
|-------|---------|------------------|----------------|-----------|
| Incubation | Full creation | Create + Join + Track | -- | Share links |
| Graduation | Analytics | Notification | -- | Cast embed |
| Chama | Full dashboard | -- | Vote, contribute, claim | Leaderboards |
| Discovery | Search + browse | Friend-based join | -- | Cast embeds |

---

## 8. Viral Mechanics

### The Inherent N-Player Loop

```
1. You can't have a Chama alone (minimum 3 members, target 5-20)
2. Every member comes from someone's invite
3. Every member eventually creates their OWN Chama with different friends
4. Each new Chama = new token = new V4 pool = new economy
5. Growth is multiplicative, not additive
```

### The Token Price Signal

Unlike Kiln/TryHold where balance grows by invisible cents, ChamaFi has a **visible token price chart**:
- "My Chama token went from $0.01 to $0.016" = a STORY
- Stories spread on Farcaster as cast embeds
- Dynamic OG images show real-time stats

### Additional Mechanics

| Mechanic | Implementation |
|----------|---------------|
| **Streak bonuses** | Save every week for 12 weeks -> badge + yield boost |
| **Leaderboards** | Top Chamas by TVL / yield / members. Regional: "Best in Nairobi" |
| **Graduation events** | Shareable moment: "My Chama just launched!" |
| **Referral** | Bring a friend -> both get yield boost for 30 days |
| **Geographic density** | Target 3 cities first: Nairobi, Lagos, Accra |
| **FOMO** | Incubation countdown timer. "2 spots left!" |

---

## 9. Competition Analysis

### MiniApp Competition (Opera MiniPay)

| MiniApp | Type | Yield Source | APY | Social? | Viral? | Sustainable? |
|---------|------|-------------|-----|---------|--------|-------------|
| **Kiln Earn** (Feb 2026) | Individual yield | Aave V3 USDT | ~0.66% | No | No | Yes |
| **TryHold** | Hold-to-claim | Mento treasury | ~25% (if daily) | No | No | No (treasury) |
| **Buy Gold** | Store of value | Gold price | 0% | No | No | Yes |
| **GoodDollar** | UBI | Protocol mint | N/A (free G$) | No | No | Yes |
| **ChamaFi** | **Group savings** | **Feather + V4 hooks** | **11-13%+** | **Yes** | **Yes** | **Yes** |

### ChamaFi vs Kiln Earn (primary competitor)

**Kiln = M-Shwari (individual savings). ChamaFi = Chamas (group savings).** Both coexist in Kenya — different products for different needs.

| Dimension | Kiln Earn | ChamaFi |
|-----------|----------|---------|
| Model | Individual deposit -> Aave | Group savings circle with own ERC20 token |
| Yield | ~0.66% (single source) | 11-13%+ (Feather + LP + token inflation) |
| Token model | None | ERC20 per Chama with bonding curve |
| Social / Viral | No | Yes (N-player requirement) |
| Governance | No | On-chain proposals + voting |
| Local stablecoins | No (USDT only) | Yes (KESm, NGNm, GHSm, cUSD, USDC, USDT) |
| Credit access | No | Yes (rotating payouts / ROSCA) |
| AI agent | No | Yes (ERC-8004) |
| Evolution | Static | Incubation -> Graduation -> Chama |
| Sustainability | Yes (real DeFi) | Yes (real DeFi) |

### ChamaFi vs TryHold

| Dimension | TryHold | ChamaFi |
|-----------|---------|---------|
| Yield source | Mento-funded treasury (unsustainable) | Feather vault (real DeFi yield) |
| Mechanism | Manual daily claiming | Automatic via V4 hooks |
| Asset support | cUSD only | Multi-asset (USDT, USDC, KESm, NGNm, CELO) |
| Token | None | ERC20 per Chama |
| Social | None | Group savings with accountability |
| Transparency | Opaque (black box treasury) | On-chain (vault balance visible) |

### Prior Art (Dead)

- **HaloFi / GoodGhosting** — Savings challenges on Celo. **Archived Nov 2024.** Validates concept. Zero active competition.

---

## 10. Ecosystem Alignment & Grants

| Celo Priority | How ChamaFi Delivers |
|--------------|---------------------|
| **Grow transactions** | N members x N Chamas x (buy + LP + compound + payout) per cycle |
| **Grow TVL** | All stablecoins rehypothecated into yield vaults |
| **MiniPay integration** | Two dedicated MiniApps: Incubate + Govern |
| **Local stablecoins** | First real use case for KESm, NGNm, GHSm |
| **AI agents** | Production showcase for ERC-8004 + x402 + MCP |
| **Novel DeFi** | Bonding curve + V4 hooks + group savings = new primitive |
| **Complementary** | Kiln = individual. ChamaFi = social. Together = complete ecosystem. |

### Grant Strategy

1. **Prezenti Anchor** (open now) -> Apply post-MVP with 10K+ daily txs target
2. **Celo Camp Batch 10** (open now) -> Apply for accelerator + $33K investment
3. **Verda Ventures** -> Reach out with deck after prototype
4. **Proof-of-Ship** -> Register immediately for monthly shipping rewards

---

## 11. Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Feather withdrawal timelock** | High | Verify before integration. Fallback: liquidity buffer or alternative yield source. |
| **Smart contract security** | High | Use audited yield layers. P12YN validated by 434 simulation tests. Get independent audit. |
| **Bonding curve complexity for users** | Medium | Abstract completely. User sees "buy membership" / "contribute" — not "bonding curve". |
| **Low Celo DeFi yields** | Medium | Feather + Merkl incentives + token inflation. Frame as inflation hedge. 0% cUSD > -20% Naira. |
| **Regulatory** | Medium | Non-custodial. Smart contract holds funds, not a company. No KYC at app layer. |
| **Adoption cold start** | Medium | Seed 5 Chamas with team + friends. Target 3 cities (Nairobi, Lagos, Accra). |
| **Competition emerges** | Low | First mover in on-chain Chamas. Local stablecoins = Celo moat. |
| **MiniPay listing rejection** | Low | Follow exact spec: auto-connect, HTTPS, PageSpeed, verified contracts. |
| **Chama member defaults** | Medium | Smart contract enforces schedule. ERC-8004 reputation. Circle can vote to eject. |
| **Uniswap V4 not yet on Celo** | Medium | Track deployment. Develop against V4 on testnet. V3 fallback if needed. |

---

## 12. Roadmap

> Phases aligned with Openclaw team operating contract (see `config/agents/manager/AGENTS.md`).

### Phase 1: Brainstorming [COMPLETE]

Ideation, concept validation, architecture design with Claw.

#### 1a. Research
- [x] Celo ecosystem analysis (DeFi protocols, TVL, stablecoins)
- [x] MiniPay MiniApp ecosystem and competition (Kiln, TryHold, Buy Gold)
- [x] Africa fintech landscape (M-Pesa, Piggyvest, Chamas/ROSCAs)
- [x] Farcaster Mini App developer capabilities
- [x] AI agent x DeFi integration patterns (ERC-8004, x402, MCP)
- [x] Viral crypto growth patterns and mechanics
- [x] Celo grants and ecosystem funding intel

#### 1b. Concept
- [x] ChamaFi x Commonwealth Protocol concept defined
- [x] Lifecycle: Incubation -> Graduation -> Chama operation
- [x] P12YN bonding curve selected (from github.com/Mc01/v4)
- [x] V4 Hook + Feather yield strategy decided
- [x] Surface decomposition: Web + MiniApps (Incubate, Govern) + Farcaster
- [x] PLAN.md written

---

### Phase 2: Concept

Website (Vercel) + Smart Contract (Celo) first implementation.

#### 2a. Foundation
- [ ] Research Feather: withdrawal mechanics, audit status, admin keys, liquidity depth
- [ ] Verify Uniswap V4 deployment status on Celo
- [ ] Solidity spec: ChamaFactory + Incubation + ChamaHook + ChamaGovernance
- [ ] Port P12YN: Python simulation -> Foundry fuzz tests

#### 2b. Smart Contracts
- [ ] Implement ChamaFactory + Incubation
- [ ] Implement ChamaToken (ERC20 + ERC20Votes)
- [ ] Implement ChamaHook (V4 hook with Feather adapter)
- [ ] Implement ChamaGovernance
- [ ] Implement ChamaRegistry
- [ ] Deploy to Celo Sepolia

#### 2c. Website
- [ ] Next.js app scaffold with surface detection (MiniPay / Farcaster / Web)
- [ ] Landing page: "Your Chama, Your Commonwealth"
- [ ] `/incubate` — Create new Chama, set parameters, invite link
- [ ] `/incubate/[id]` — Progress page, commit capital, share, countdown
- [ ] `/chama/[id]` — Dashboard: token price, TVL, members, yield
- [ ] `/chama/[id]/govern` — Proposals, voting, execution
- [ ] `/chama/[id]/treasury` — Yield breakdown, strategy, analytics
- [ ] `/discover` — Browse public Chamas
- [ ] `/profile` — Your Chamas, tokens, yield, reputation
- [ ] Deploy to Vercel

---

### Phase 3: Expansion

MiniApp (MiniPay) + Farcaster App + Agent/Human support.

#### 3a. MiniApps
- [ ] MiniApp: "Chamas: Incubate" — create, join, track incubating Chamas
- [ ] MiniApp: "Chamas: Govern" — vote, contribute, claim payouts
- [ ] MiniPay-specific: auto-connect, phone invites (SocialConnect), simplified UX
- [ ] Test on MiniPay Site Tester

#### 3b. Farcaster App
- [ ] Farcaster Mini App: social features, cast embeds, leaderboards
- [ ] Dynamic OG images for Chama cards (name, members, APY, token chart)
- [ ] `composeCast` integration at graduation moments
- [ ] Push notifications (streak reminders, governance alerts, yield updates)
- [ ] Farcaster manifest (`.well-known/farcaster.json`)

#### 3c. AI Agent
- [ ] ERC-8004 agent registration on Celo mainnet
- [ ] Auto-compound functionality via session keys (ERC-7579)
- [ ] Farcaster notification integration
- [ ] MCP server (create_chama, contribute, get_yield_report, propose, vote)
- [ ] x402 endpoint for premium analytics
- [ ] REST API + llms.txt + OpenAPI spec

---

### Phase 4: Distribution

Marketing on X, Farcaster, Celo Forum, MiniPay Forum, Moltbook + app submissions.

#### 4a. Deployment & Audit
- [ ] Security review / audit of smart contracts
- [ ] Deploy to Celo Mainnet
- [ ] Seed 5 initial Chamas with team + early community

#### 4b. Store Submissions
- [ ] MiniPay MiniApp listing submission (Celoscan-verified contracts, PageSpeed, support link)
- [ ] Farcaster Mini App publishing (permissionless)

#### 4c. Marketing & Community
- [ ] Launch post on Farcaster /celo channel
- [ ] X / Twitter account + launch thread
- [ ] Celo Forum announcement post
- [ ] MiniPay Forum / community announcement
- [ ] Moltbook content
- [ ] Apply for Prezenti Anchor grant
- [ ] Apply for Celo Camp Batch 10
- [ ] Reach out to Verda Ventures

#### 4d. Growth
- [ ] Ambassador program in Nairobi, Lagos, Accra
- [ ] WhatsApp community groups (primary Africa distribution channel)
- [ ] Farcaster channel for ChamaFi community
- [ ] Federation feature between Chamas
- [ ] Additional yield adapters via governance

---

### Phase 5: Demo

Showcase all work, prepare demo materials.

#### 5a. Demo Materials
- [ ] Demo video: full user journey (incubation -> graduation -> chama operation)
- [ ] Pitch deck (for Celo Camp, Verda Ventures, ecosystem presentations)
- [ ] Live walkthrough script for investor/partner meetings
- [ ] Screenshots + recordings for MiniPay + Farcaster surfaces

#### 5b. Showcase
- [ ] ETHGlobal / hackathon submission (if applicable)
- [ ] Celo community call presentation
- [ ] Farcaster demo cast with live Chama showcase
- [ ] Documentation site / developer docs for Commonwealth Protocol

---

## References

### Celo Ecosystem
- [Celo Docs](https://docs.celo.org)
- [Celo Forum](https://forum.celo.org)
- [MiniPay Developer Docs](https://docs.celo.org/build-on-celo/build-on-minipay/overview)
- [DeFiLlama Celo](https://defillama.com/chain/Celo)

### Commonwealth Protocol
- [github.com/Mc01/v4](https://github.com/Mc01/v4) — Bonding curve simulations
- [MODELS.md](https://github.com/Mc01/v4/blob/master/sim/MODELS.md) — Model matrix
- [MATH.md](https://github.com/Mc01/v4/blob/master/sim/MATH.md) — Bonding curve formulas

### Farcaster
- [Farcaster Mini Apps SDK](https://miniapps.farcaster.xyz)
- [celo-org/celo-farcaster-frames](https://github.com/celo-org/celo-farcaster-frames)

### Competition
- [Kiln MiniPay Earn](https://www.kiln.fi/post/kiln-powers-stablecoin-earn-product-for-minipay-users-on-celo-targeting-1-3b-unbanked-globally)
- [TryHold](https://tryhold.xyz) — ProofOfHold contract: `0x87514A7f5114568980Ae12B170124f8Db34Ef31A`
- [HaloFi/GoodGhosting](https://github.com/Good-Ghosting) — Archived Nov 2024

### AI Agent Stack
- [ERC-8004 on Celo](https://docs.celo.org/build-on-celo/build-with-ai/8004) — Identity Registry: `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`
- [x402 Agent Payments](https://docs.celo.org/build-on-celo/build-with-ai/x402)
- [Celo MCP Server](https://docs.celo.org/build-on-celo/build-with-ai/mcp/celo-mcp)

### Africa Fintech
- [Chainalysis SSA 2024](https://www.chainalysis.com/blog/subsaharan-africa-crypto-adoption-2024/)
- [GSMA State of the Industry 2025](https://www.gsma.com/sotir/)
- [World Bank Global Findex SSA](https://www.worldbank.org/en/publication/globalfindex/brief/financial-inclusion-in-sub-saharan-africa-overview)

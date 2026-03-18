# Moltbook Submission — ChamaFi

**Project Name**: ChamaFi

**Tagline**: Savings circles supercharged with DeFi yield

**Track**: [TBD — DeFi / SocialFi / Financial Inclusion]

---

## Project Summary

ChamaFi digitizes Africa's centuries-old savings circle tradition (Chamas, Ajo, Stokvels) and supercharges it with automated DeFi yield, on-chain governance, and AI-powered management.

Built exclusively on Celo, ChamaFi leverages local stablecoins, fee abstraction, and ERC-8004 agent identities to create a savings experience impossible to replicate on any other chain.

**Demo**: https://chamafi-hybrid-3.vercel.app

---

## The Problem

### Market Context

- **$4B+** managed by savings circles in Kenya alone
- **300,000+** active Chama groups in Kenya
- **50%+** of informal workers in Nigeria participate in Ajo/Esusu
- **R50B+** ($2.7B) annual turnover in South African Stokvels

### Current Limitations

| Issue | Impact |
|-------|--------|
| Funds sit idle | Losing 10-30% annually to inflation |
| No transparency | Fraud and mismanagement common |
| No credit history | Can't leverage savings for loans |
| Manual tracking | WhatsApp + spreadsheets = errors |
| Limited access | Requires physical meetings |

### The Opportunity

Despite being Africa's most trusted financial institution, **zero on-chain savings circle products exist**. Previous attempt (HaloFi on Celo) archived Nov 2024 — validates concept, zero competition.

---

## The Solution

ChamaFi brings savings circles on-chain with three key innovations:

### 1. Tokenized Savings Circles

Each Chama becomes a mini-economy:
- ERC20 token with bonding curve pricing
- Early contributors get better rates
- Token = governance rights + treasury share
- Tradeable on Uniswap V4

### 2. Automatic Yield Generation

No idle capital:
- Rehypothecation hooks on Uniswap V4
- Idle funds route to Feather yield vaults
- ~5% APY on stablecoins
- Auto-compounding, no manual claims

### 3. AI-Powered Management

Each Chama gets an AI agent (ERC-8004):
- Sends contribution reminders
- Optimizes yield allocation
- Drafts governance proposals
- Answers member questions

---

## Technical Architecture

### Smart Contracts (Celo)

```
ChamaFactory
├── ChamaToken (ERC20 + Bonding Curve)
├── ChamaGovernor (OpenZeppelin)
├── ChamaTreasury
└── V4Hook (Rehypothecation)

AgentRegistry (ERC-8004)
└── ChamaAgent (per Chama)
```

### Yield Flow

```
User Contribution
      ↓
ChamaToken Purchase (Bonding Curve)
      ↓
Uniswap V4 Pool
      ↓
V4 Rehypothecation Hook
      ↓
Feather Vault (Morpho)
      ↓
Yield Compounds → Token Price Rises
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Blockchain | Celo (Chain 42220) |
| Contracts | Solidity + OpenZeppelin |
| DEX | Uniswap V4 |
| Yield | Feather (Morpho-based) |
| Frontend | React + Vite + Tailwind |
| Wallet | RainbowKit + Wagmi |
| AI | ERC-8004 Agents |

---

## Multi-Platform Distribution

ChamaFi is designed for maximum reach:

### 1. MiniPay MiniApp
- **Reach**: 12M+ wallets, 700K+ DAU
- **Market**: Africa-first (Kenya, Nigeria, Ghana, SA)
- **Features**: Phone invites, local stablecoins, auto-connect

### 2. Farcaster Mini App
- **Reach**: Builder community, CT audience
- **Features**: In-feed embeds, shareable Chamas
- **Benefit**: Viral distribution via social graph

### 3. Web App
- **Reach**: Desktop users, global access
- **Features**: Full governance dashboard, analytics
- **Benefit**: Power user features

---

## Key Metrics

### Target Metrics (90 days post-launch)

| Metric | Target |
|--------|--------|
| Active Chamas | 200 |
| Total Users | 1,000 |
| Total Value Locked | $100,000 |
| Cumulative Transactions | 50,000 |
| Avg. Yield Distributed | $5,000 |

### Current Status (Hackathon)

| Milestone | Status |
|-----------|--------|
| Core Smart Contracts | ✅ Complete |
| MiniPay MiniApp | ✅ Complete |
| Farcaster Mini App | ✅ Complete |
| Web Interface | ✅ Complete |
| Testnet Deployment | ✅ Live |
| Mainnet Deployment | ⏳ Post-hackathon |

---

## Why This Matters

### For Users
- **Protect savings** from 10-30% annual inflation
- **Earn yield** instead of letting funds sit idle
- **Build credit history** through on-chain reputation
- **Access anywhere** via mobile

### For Celo Ecosystem
- **Drive transactions**: Each Chama = 4-8 tx/week minimum
- **Grow TVL**: All pooled funds generate DeFi TVL
- **Expand reach**: Target 300K+ offline savings groups
- **Showcase innovation**: V4 hooks, ERC-8004, local stablecoins

### For Web3
- **Real-world adoption**: Tapping existing $50B market
- **Financial inclusion**: Designed for emerging markets
- **Cultural respect**: Building on tradition, not replacing it

---

## Demo

**Live URL**: https://chamafi-hybrid-3.vercel.app

**Demo Video**: [TBD — link after recording]

**GitHub**: [TBD — repo when public]

---

## Team

Building for the MOLT/MiniPay hackathon.

---

## Links

- **Website**: https://chamafi-hybrid-3.vercel.app
- **Twitter/X**: @[TBD]
- **Farcaster**: @[TBD]
- **Celo Forum**: [Post TBD]
- **MiniPay Forum**: [Post TBD]

---

## Future Roadmap

### Q2 2026
- Mainnet launch
- First 100 active Chamas
- Bug bounty program
- Governance token

### Q3 2026
- Mobile native apps (iOS/Android)
- Cross-chain Chamas
- Advanced AI features
- Institutional partnerships

### Q4 2026
- 1,000+ active Chamas
- Multi-language support (Swahili, Hausa, Yoruba)
- Credit scoring integration
- Insurance partnerships

---

*Submitted for MOLT/MiniPay Hackathon*
*March 2026*

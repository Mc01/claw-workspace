# MiniPay Forum Post — MiniApp Submission Draft

**Product Name**: ChamaFi

**Category**: Finance / Savings & Investment

**Submission Status**: Ready for review

---

## MiniApp Overview

**One-line description**: Group savings circles with automatic DeFi yield — digitizing Africa's Chama tradition.

**Full description**: 

ChamaFi brings Africa's centuries-old savings circle tradition (Chamas, Ajo, Stokvels) into the digital age. Create or join savings groups with friends and family, contribute regularly, and watch your collective savings grow through automated DeFi yield.

Unlike traditional savings circles where money sits idle, ChamaFi puts your pooled funds to work through secure yield-generating protocols, while giving your group full control through on-chain voting and governance.

**Target markets**: Kenya, Nigeria, Ghana, South Africa, West Africa (all MiniPay markets)

**Primary language**: English (Swahili and local language support planned)

---

## Problem Statement

### The Challenge

Over $4 billion flows through informal savings circles in Kenya alone each year. These Chamas:

- Rely on WhatsApp groups and spreadsheets for tracking
- Have funds sitting idle, losing value to inflation
- Require high trust (fraud is common)
- Offer no credit history or financial benefits
- Are completely offline with no yield generation

### Why MiniPay Users Need This

According to MiniPay research, the #1 unmet user need is **Savings + Credit** (29.4% of users). 81% of Nigerian MiniPay users value stablecoins for currency protection against inflation.

Current options:
- Individual yield products exist (Kiln launched Feb 2026)
- Group savings with yield: **none exist**

---

## Solution

### What ChamaFi Does

1. **Create or Join** — Start a savings circle or join an existing one via invite link or phone number

2. **Contribute** — Send regular contributions during the "incubation" phase with bonding curve pricing (early contributors get better rates)

3. **Graduate** — Once the Chama reaches its goal, it graduates to a fully on-chain organization with its own token and governance

4. **Earn Yield** — All pooled stablecoins automatically earn yield from DeFi protocols. No manual claiming needed.

5. **Govern Together** — Vote on proposals, manage the treasury, decide on payouts as a group

### Key Features

| Feature | Description | User Benefit |
|---------|-------------|--------------|
| Auto-Connect | No connect button — wallet connects automatically | Seamless UX |
| Phone Invites | Find members by phone number via SocialConnect | Easy onboarding |
| Multiple Stablecoins | Save in cUSD, cKES, cNGN, cGHS, cZAR + 10 more | Local currency protection |
| Bonding Curve | Early contributors get better pricing | Reward participation |
| Automatic Yield | Funds earn ~5% APY automatically | Passive income |
| On-Chain Voting | Proposals, voting, treasury management | Democratic governance |
| AI Reminders | Smart notifications for contributions | Accountability |

---

## User Journey

### First-Time User (Maria in Kenya)

1. Opens ChamaFi from MiniPay MiniApps directory
2. Sees option to Create Chama or Join Chama
3. Creates a "Family Land Savings" Chama
4. Sets contribution: 1,000 cKES weekly
5. Invites 5 family members via phone contacts
6. First contribution made — sees bonding curve pricing
7. Receives AI reminder each week
8. After 3 months, Chama graduates
9. Receives Chama tokens representing ownership
10. Votes on first proposal: partial withdrawal for land deposit

### Returning User

1. Opens ChamaFi — auto-connects
2. Dashboard shows: current balance, yield earned, upcoming votes
3. Makes weekly contribution in one tap
4. Reviews and votes on active proposal
5. Checks yield earned this month

---

## Technical Implementation

### MiniPay Compatibility

| Requirement | Implementation |
|-------------|----------------|
| Auto-connect | ✅ `window.ethereum` auto-detection, no connect button |
| Legacy transactions | ✅ EIP-155 disabled, legacy format used |
| Celo chain | ✅ Chain 42220 (mainnet) and 44787 (Alfajores testnet) |
| HTTPS | ✅ Hosted on Vercel with SSL |
| PageSpeed | ✅ Optimized, <3s load time |

### Supported Wallets
- MiniPay (primary)
- MetaMask Mobile
- Rainbow Wallet
- Coinbase Wallet (via WalletConnect)

### Network
- **Primary**: Celo Mainnet (Chain ID: 42220)
- **Testnet**: Celo Alfajores (Chain ID: 44787)

### Smart Contracts

All contracts deployed on Celo:

| Contract | Status | Purpose |
|----------|--------|---------|
| ChamaFactory | ✅ Deployed | Creates new Chamas |
| ChamaToken | ✅ Deployed | Bonding curve token |
| ChamaGovernor | ✅ Deployed | Governance logic |
| ChamaTreasury | ✅ Deployed | Treasury management |

*Contract addresses to be provided after final audit*

---

## Screenshots Required

### Required Screenshots (for MiniApp Store listing)

1. **Home Screen / Dashboard**
   - Shows user's active Chamas
   - Balance overview
   - Recent activity
   - Yield earned display

2. **Create Chama Flow**
   - Chama creation form
   - Name, description, contribution schedule
   - Minimum members setting

3. **Invite Members Screen**
   - Phone number input
   - SocialConnect integration
   - Share link option

4. **Contribution Screen**
   - Amount input
   - Token selection (cUSD, cKES, etc.)
   - Bonding curve visualization
   - Confirm transaction

5. **Chama Detail / Governance**
   - Member list
   - Treasury balance
   - Active proposals
   - Voting interface

6. **Yield Dashboard**
   - Total yield earned
   - APY display
   - Yield source breakdown

### Screenshot Specifications

- **Resolution**: 1080x1920 (9:16 aspect ratio, mobile)
- **Format**: PNG or JPG
- **File size**: <500KB each
- **Content**: Real app data (not mockups)
- **Language**: English

---

## Compliance & Safety

### Legal

- **Terms of Service**: [Link TBD]
- **Privacy Policy**: [Link TBD]
- **KYC**: Not required for Chama participation (self-governing groups)
- **AML**: No custody — smart contracts hold funds, non-custodial protocol

### Security

- Contracts use OpenZeppelin libraries (industry standard)
- Multi-sig for protocol upgrades
- Gradual rollout with deposit limits
- Emergency pause functionality

### User Protection

- Clear risk warnings about DeFi yield fluctuations
- No guaranteed returns stated
- Transparent fee structure (0.5% protocol fee on yield only)
- Easy exit mechanism (sell tokens on AMM)

---

## Support & Contact

**Support Email**: [TBD]

**Support Hours**: 9am-6pm EAT (Nairobi time)

**Response Time**: <24 hours for critical issues

**SLA Commitment**: Critical bugs fixed within 24 hours or MiniApp temporarily disabled

**Documentation**: [TBD - help center link]

**Social**: 
- Twitter/X: @[TBD]
- Farcaster: @[TBD]

---

## Metrics & Goals

### 30-Day Goals

| Metric | Target |
|--------|--------|
| Active Chamas Created | 50 |
| Total Users | 200 |
| Total Value Locked | $10,000 |
| Retention (7-day) | 40% |

### 90-Day Goals

| Metric | Target |
|--------|--------|
| Active Chamas | 200 |
| Total Users | 1,000 |
| Total Value Locked | $100,000 |
| MiniPay MiniApp Ranking | Top 10 |

### Success Metrics

- **Transaction volume**: Each Chama generates 4-8 transactions per week
- **User engagement**: Average 3+ sessions per week
- **Retention**: 7-day retention >40%, 30-day retention >25%
- **Growth**: 20% week-over-week Chama creation

---

## Why MiniPay?

### Market Fit

- **12M+ wallet activations** across 66 countries
- **700K+ daily active addresses** — highest DAU of any Ethereum L2
- **29.4% of users** cite savings as top unmet need
- **81% of Nigerian users** use stablecoins for inflation protection

### Technical Fit

- Celo-native: sub-cent fees, local stablecoins
- SocialConnect: phone-based onboarding
- Fee abstraction: no CELO needed for gas
- Already integrated: Mento stablecoins, Feather yield

### Mission Alignment

ChamaFi and MiniPay share the same mission: **financial inclusion for the next billion users**. By combining MiniPay's distribution with ChamaFi's savings circle innovation, we can bring millions of offline savings groups into the digital economy.

---

## Call to Action

We request MiniPay team to:

1. **Review** this MiniApp submission
2. **Test** the app at https://chamafi-hybrid-3.vercel.app
3. **Provide feedback** on UX and integration
4. **Approve listing** once contract audit is complete

We're committed to building the best savings experience for MiniPay users and will prioritize any feedback from the MiniPay team.

---

*Submitted by: ChamaFi Team*
*Date: [TBD]*
*Version: 1.0.0*

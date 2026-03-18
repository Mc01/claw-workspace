# 🎬 ChamaFi — Demo Script for Judges

> **Estimated time**: 5-7 minutes
>
> **Prerequisites**: MetaMask or any Celo wallet with Celo Sepolia testnet configured and some testnet CELO for gas.

---

## Setup

1. **Open the app**: [https://chamafi-hybrid-3.vercel.app](https://chamafi-hybrid-3.vercel.app)
2. **Connect wallet**: Click "Launch App" → connect with RainbowKit (MetaMask, WalletConnect, etc.)
3. **Switch to Celo Alfajores** (testnet) if prompted

---

## Demo Flow

### Act 1: The Landing (30 seconds)

> *"ChamaFi brings Africa's $50B savings circle tradition on-chain."*

1. Show the **landing page** at `/`
2. Point out the tagline: **"Save Together, Grow Together"**
3. Highlight the key value props:
   - Group Savings — pool funds with friends
   - Trustless & Transparent — smart contract managed
   - DeFi Yield — idle funds earn yield via Morpho vaults
4. Click **"Launch App"**

---

### Act 2: Discover Chamas (30 seconds)

> *"Users can browse all active savings circles on the Discover page."*

1. You're now on `/app/discover`
2. Show the **grid of existing Chamas** (if any exist)
3. Each card shows:
   - Progress bar toward the savings target
   - Member count
   - Status badge (Active / Graduated / Expired)
4. Click on any Chama to see its detail page

---

### Act 3: Create a Chama (1-2 minutes)

> *"Let's create a new savings circle — it takes 30 seconds and costs less than a penny."*

1. Click **"Create"** in the navigation
2. Fill in the form:
   - **Name**: `Judges Demo Circle`
   - **Savings Asset**: Select `cUSD`
   - **Target Amount**: `100` (low for demo purposes)
   - **Deadline**: Set to tomorrow
   - **Maximum Members**: `10`
3. Click **"Create Chama"**
4. **Approve the transaction** in your wallet
5. Wait for confirmation (~2 seconds on Celo)
6. 🎉 Chama created! Auto-redirects to Discover

> *"Under the hood, ChamaFactory used an EIP-1167 minimal proxy clone — the deployment cost was about $0.01."*

---

### Act 4: Join & Contribute (1-2 minutes)

> *"Now let's join and contribute to the savings circle."*

1. Click on the newly created Chama card
2. On the detail page, show:
   - **Progress**: 0% (no contributions yet)
   - **Stats**: 0 members, target amount, time remaining
3. Click **"Join Chama"** → approve transaction
4. Now the contribute form appears
5. Enter an amount (e.g., `50` cUSD)
6. Click **"Contribute"** → approve the ERC-20 approval + contribution
7. Watch the **progress bar animate** to 50%

> *"Contributions are held in the smart contract. If the target isn't reached by the deadline, every member gets a full refund — trustlessly."*

---

### Act 5: The Chama Detail (1 minute)

> *"Let's look at what members see."*

1. Show the **detail page** with:
   - Large progress visualization with percentage
   - Stats grid: Members, Time Left, Target, Raised
   - Your contribution amount
   - Members list with "Creator" and "You" badges
2. Click **"View on Celo Explorer"** → opens Celoscan showing the contract

---

### Act 6: Graduation & Token Minting (1 minute)

> *"When the target is reached, the Chama graduates — minting a governance token."*

If the target is met (contribute enough to reach 100%):

1. Show the progress bar at 100%
2. Explain the graduation process:
   - **ChamaToken** is minted: 1,000,000 ERC-20 + ERC20Votes tokens
   - Tokens distributed proportionally to each member's contribution
   - The Chama transitions to a **post-graduation economy**

> *"Each graduated Chama becomes its own mini-economy with a governance token. Members can delegate votes, create proposals, and manage the treasury."*

---

### Act 7: Architecture Walkthrough (1-2 minutes)

> *"Let me show you what makes this possible under the hood."*

Show the architecture diagram (in README.md or CONTRACTS.md):

```
ChamaFactory → ChamaIncubation (proxy) → ChamaToken
                        ↓ graduation
              ChamaPoolManager → Uniswap V4 Pool
                                    ↓
                            AssetHook → FeatherYieldAdapter
                                            ↓
                                    Feather Vault (Morpho)
```

Key technical highlights:
1. **EIP-1167 Minimal Proxies** — $0.01 per Chama deployment
2. **Uniswap V4 Custom Hooks** — rehypothecate idle stablecoins into yield
3. **ERC-4626 Vault Integration** — Feather (Morpho-based) vaults on Celo
4. **Per-Chama Position Tracking** — each circle's yield is isolated
5. **196 tests** covering the full protocol lifecycle

---

### Act 8: Why Celo? (30 seconds)

> *"ChamaFi can only exist on Celo."*

| Feature | Why It Matters |
|---------|---------------|
| **12M+ MiniPay wallets** | Distribution to Africa's unbanked |
| **15 local stablecoins** | KESm, NGNm, GHSm — savings in local currency |
| **Fee abstraction** | Pay gas in stablecoins — no CELO needed |
| **Sub-cent fees** | Join a Chama for $0.001 |
| **SocialConnect** | Invite friends via phone number |

---

## Closing

> *"$50 billion flows through informal savings circles in Africa every year. Zero is on-chain. ChamaFi changes that — trustless, yield-generating, and accessible to 12 million MiniPay users today."*

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Wallet won't connect | Ensure you're on Celo Alfajores testnet |
| Transaction fails | Check you have testnet CELO for gas (faucet: https://faucet.celo.org) |
| No Chamas visible | Create one first via the Create page |
| Contribution fails | Ensure you have testnet cUSD (mint via Celo faucet) |

# 💻 ChamaFi — Frontend Documentation

## Overview

The ChamaFi frontend is a **React SPA** built with Vite, TypeScript, Tailwind CSS, and wagmi/viem for Celo blockchain interaction. It supports Web3 wallet connections via RainbowKit.

**Live URL**: [https://chamafi-hybrid-3.vercel.app](https://chamafi-hybrid-3.vercel.app)

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Vite** | 5.x | Build tool & dev server |
| **React** | 18.x | UI framework |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.x | Styling |
| **wagmi** | 2.x | React hooks for Ethereum |
| **viem** | 2.x | Low-level blockchain interaction |
| **RainbowKit** | 2.x | Wallet connection UI |
| **React Router** | 6.x | Client-side routing |
| **TanStack Query** | 5.x | Server state management |
| **Lucide React** | Latest | Icons |

---

## Project Structure

```
chamafi-hybrid-3/
├── public/                     # Static assets
├── src/
│   ├── abi/                    # Contract ABIs
│   │   ├── ChamaFactory.ts    # Factory ABI
│   │   ├── ChamaIncubation.ts # Incubation ABI
│   │   ├── ERC20.ts           # Standard ERC-20 ABI
│   │   └── index.ts           # Re-exports
│   ├── assets/                 # Images (hero.png, etc.)
│   ├── components/
│   │   ├── AppLayout.tsx       # App pages layout (with nav)
│   │   ├── LandingLayout.tsx   # Landing page layout (standalone)
│   │   ├── ChamaCard.tsx       # Chama card for discover grid
│   │   ├── ConnectWallet.tsx   # Wallet connection component
│   │   ├── ProgressBar.tsx     # Animated savings progress bar
│   │   └── Toast.tsx           # Toast notification system
│   ├── config/
│   │   ├── wagmi.ts            # Wagmi + RainbowKit configuration
│   │   ├── contracts.ts        # Contract addresses per chain
│   │   └── index.ts            # Re-exports
│   ├── hooks/
│   │   ├── useChama.ts         # Read/write hooks for ChamaIncubation
│   │   ├── useChamaFactory.ts  # Read/write hooks for ChamaFactory
│   │   ├── useToken.ts         # ERC-20 balance, allowance, approval
│   │   └── index.ts            # Re-exports
│   ├── lib/
│   │   └── utils.ts            # Formatting, time helpers, cn()
│   ├── pages/
│   │   ├── Landing.tsx         # Marketing landing page
│   │   ├── Discover.tsx        # Browse all Chamas
│   │   ├── Create.tsx          # Create new Chama form
│   │   ├── ChamaDetail.tsx     # Single Chama view (join/contribute/refund)
│   │   ├── MyChamas.tsx        # User's Chamas dashboard
│   │   └── index.ts            # Re-exports
│   ├── App.tsx                 # Root component with routes
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles + Tailwind imports
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript config
├── vercel.json                 # Vercel deployment settings
└── package.json                # Dependencies
```

---

## Pages

### Landing (`/`)
Marketing page with hero, features grid, "how it works" section, and stats. Links to the main app.

### Discover (`/app` or `/app/discover`)
Grid of all Chamas fetched from `ChamaFactory.getAllChamas()`. Each card shows:
- Chama name and address
- Progress bar (current vs target)
- Member count
- Status badge (Active / Graduated / Expired)

### Create (`/app/create`)
Form to create a new Chama with validation:
- **Name** — Required, min 3 characters
- **Savings Asset** — cUSD, USDC, USDT, or CELO (visual selector)
- **Target Amount** — Must be positive
- **Minimum Contribution** — Optional floor per member
- **Deadline** — Must be in the future
- **Maximum Members** — 2 to 1000

Submits `ChamaFactory.createChama()` transaction.

### Chama Detail (`/app/chama/:address`)
Full detail view for a single Chama:
- **Header** with name, address, status badge
- **Progress visualization** with percentage
- **Stats grid**: Members, Time Left, Target, Raised
- **Actions** (context-dependent):
  - Join (if not a member)
  - Contribute (if member, active)
  - Refund (if expired, not graduated, has contribution)
- **Members list** with creator badge
- **Link to Celoscan** explorer

### My Chamas (`/app/my-chamas`)
Dashboard showing only the Chamas where the connected wallet is a member.

---

## Environment Variables

Create a `.env.local` file in the `chamafi-hybrid-3/` directory:

```env
# WalletConnect Project ID (get from https://cloud.walletconnect.com)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Contract addresses (per chain)
VITE_FACTORY_ADDRESS=0x...           # Celo Mainnet factory
VITE_FACTORY_ADDRESS_SEPOLIA=0x...   # Celo Sepolia factory
VITE_FACTORY_ADDRESS_LOCAL=0x...     # Local Anvil factory
```

> All environment variables must be prefixed with `VITE_` to be accessible in the browser.

---

## Setup & Development

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
cd chamafi-hybrid-3
npm install
```

### Development Server

```bash
npm run dev
# Opens at http://localhost:5173
```

### Production Build

```bash
npm run build
# Output in dist/
```

### Preview Production Build

```bash
npm run preview
```

---

## Wallet Configuration

The app supports three chains:

| Chain | ID | RPC |
|-------|----|-----|
| Celo Mainnet | 42220 | `https://forno.celo.org` |
| Celo Alfajores (Sepolia) | 44787 | `https://alfajores-forno.celo-testnet.org` |
| Hardhat (local) | 31337 | `http://127.0.0.1:8545` |

### MiniPay Detection

The app detects MiniPay via:
```typescript
export function isMiniPay(): boolean {
  return (window as any).ethereum?.isMiniPay === true;
}
```

When running inside MiniPay, the app auto-connects without showing a wallet picker.

---

## Contract Integration

### Hooks Architecture

The frontend uses **wagmi hooks** for all contract interactions:

| Hook | Contract | Functions |
|------|----------|-----------|
| `useChamaFactory()` | ChamaFactory | `getAllChamas()`, `chamaCount`, `createChama()` |
| `useChama(address)` | ChamaIncubation | `params`, `progress`, `graduated`, `members`, `join()`, `contribute()`, `refund()` |
| `useToken(address)` | ERC-20 | `name`, `symbol`, `decimals`, `totalSupply` |
| `useTokenBalance(token, user)` | ERC-20 | `balanceOf()` |
| `useTokenAllowance(token, owner, spender)` | ERC-20 | `allowance()`, `approve()` |

### Contract Addresses

Addresses are resolved per chain via `config/contracts.ts`:

```typescript
const factory = getFactoryAddress(chainId);
const tokenAddr = getTokenAddress(chainId, 'cUSD');
```

---

## Deployment

### Vercel

The app is deployed on Vercel with the following configuration:

```json
{
  "buildCommand": null,
  "outputDirectory": "dist",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- Framework: Vite (detected automatically)
- Node version: 24.x
- SPA rewrite rule for client-side routing
- Cache headers: immutable for static assets, no-cache for index.html

### Manual Deploy

```bash
npm install -g vercel
vercel              # Preview deployment
vercel --prod       # Production deployment
```

---

## Styling

### Theme

- **Dark theme** with green accent (`#22c55e` / emerald-500)
- Glass-morphism cards (`.glass-card`)
- Custom dark RainbowKit theme with green accent
- Responsive: mobile-first, breakpoints at `sm`, `md`, `lg`

### Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.glass-card` | Frosted glass card with border |
| `.btn-primary` | Green gradient button |
| `.btn-secondary` | Outline/ghost button |
| `.input-dark` | Dark input field |
| `.badge-active` | Green status badge |
| `.badge-graduated` | Gold status badge |
| `.badge-expired` | Red status badge |
| `.animate-fade-in` | Fade-in entrance animation |
| `.animate-slide-up` | Slide-up entrance animation |

---

## Utility Functions (`lib/utils.ts`)

| Function | Purpose |
|----------|---------|
| `cn(...inputs)` | Merge Tailwind classes (clsx + twMerge) |
| `formatAddress(addr)` | `0x1234...5678` truncation |
| `formatAmount(bigint, decimals)` | Format wei to human-readable |
| `formatPercentage(bigint)` | Format basis points to `X.X%` |
| `formatDate(timestamp)` | Unix timestamp → `Jan 15, 2026` |
| `formatDateTime(timestamp)` | Unix timestamp → `Jan 15, 2026, 02:30 PM` |
| `getDaysRemaining(timestamp)` | Days until deadline |
| `isExpired(timestamp)` | Check if deadline has passed |

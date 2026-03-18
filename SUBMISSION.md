# 🌱 ChamaFi - Hackathon Submission

**Project Name**: ChamaFi  
**Tagline**: "Savings circles, reimagined on Celo"  
**Team**: Mc01  
**Submission Date**: March 18, 2026

---

## 🎯 Tracks

| Track | Relevance |
|-------|-----------|
| **Best MiniPay Mini App** | Built for Celo's 12M+ MiniPay wallets; mobile-first design; sub-cent fees |
| **Best Agentic Economy** | Each Chama becomes autonomous mini-economy with governance tokens |
| **Best Onchain FX & Stables** | Supports 15+ stablecoins; idle funds earn yield via Feather/Morpho |

---

## 🚀 Live Demo

**Production URL**: https://chamafi-hybrid-3.vercel.app

### Quick Links
- 🌐 **Live App**: https://chamafi-hybrid-3.vercel.app
- 📜 **Contract Addresses**: See below
- 💻 **Source Code**: https://github.com/Mc01/claw-workspace
- 🎬 **Demo Script**: See DEMO.md in repo

---

## 📋 Contract Addresses (Celo Sepolia Testnet)

| Contract | Address | Verified |
|----------|---------|----------|
| MockCUSD (cUSD) | `0x367cB784BF701587CA03bE93Ec29b76ffd430091` | ✅ |
| MockUSDT | `0x4c13C8F963a5326Eb4b170634f3b088e18ADD12e` | ✅ |
| MockCELO | `0x826BF3D7254AB8fE2ab080FB92e47f575993B861` | ✅ |
| ChamaFactory | `0x4c13C8F963a5326Eb4b170634f3b088e18ADD12e` | ✅ |
| FeatherYieldAdapter | `0x9D33A537645D62351d57510238ccF251A61b2cC2` | ✅ |
| ChamaPoolManager | `0x4e9f2C22f1d6d702735cf875E0583c2Bc71c2A44` | ✅ |

**Explorer**: https://sepolia.celoscan.io

---

## 🎬 Demo Video Script (3-5 minutes)

### Opening (30 sec)
> "ChamaFi brings Africa's $50 billion savings circle tradition on-chain. 
> A Chama is a community savings group — in Kenya alone, 300,000+ groups 
> manage $4 billion. Zero is on-chain. Until now."

### Act 1: Create a Chama (1 min)
1. Open https://chamafi-hybrid-3.vercel.app
2. Click "Launch App" → Connect wallet
3. Navigate to "Create" page
4. Fill form:
   - Name: "Demo Circle"
   - Asset: cUSD
   - Target: 100 cUSD
   - Members: 10
   - Deadline: Tomorrow
5. Submit transaction (~$0.01 gas)
6. See success notification

> "Creating a Chama costs less than a penny thanks to EIP-1167 minimal proxies."

### Act 2: Join & Contribute (1 min)
1. Go to "Discover" page
2. Click on newly created Chama
3. Click "Join Chama"
4. Enter contribution amount (e.g., 50 cUSD)
5. Approve token + contribute
6. Watch progress bar animate

> "Every contribution is trustlessly held in the contract. 
> If the target isn't reached by deadline, everyone gets refunded."

### Act 3: The Architecture (1 min)
Show architecture diagram:

```
ChamaFactory → ChamaIncubation (proxy) → ChamaToken
                        ↓ graduation
              ChamaPoolManager → Uniswap V4 Pool
                                    ↓
                            AssetHook → FeatherYieldAdapter
                                            ↓
                                    Feather Vault (Morpho)
```

Key points:
- **EIP-1167 clones**: $0.01 deployment
- **Uniswap V4 hooks**: Rehypothecate idle stablecoins
- **ERC-4626**: Feather yield vaults
- **ERC20Votes**: Governance tokens per Chama

### Act 4: Why Celo? (30 sec)
| Feature | Impact |
|---------|--------|
| 12M MiniPay wallets | Distribution to Africa's unbanked |
| 15 local stablecoins | Save in KESm, NGNm, GHSM |
| Fee abstraction | Pay gas in stablecoins |
| Sub-cent fees | Join for $0.001 |

### Closing (30 sec)
> "$50 billion flows through informal savings circles in Africa every year.
> ChamaFi makes them trustless, yield-generating, and accessible to 
> 12 million MiniPay users today."

---

## 🏗️ Technical Highlights

### Smart Contracts
- **Language**: Solidity 0.8.26
- **Framework**: Foundry
- **Tests**: 16 files, 353+ test functions
- **Patterns**: EIP-1167 minimal proxies, ERC-4626 vaults

### Frontend
- **Stack**: Vite + React 18 + TypeScript + Tailwind
- **Web3**: wagmi v2 + viem v2 + RainbowKit
- **Deployment**: Vercel

### Key Integrations
- Uniswap V4 (custom hooks)
- Feather Vaults (Morpho-based ERC-4626)
- OpenZeppelin 5.x

---

## 📊 Test Coverage

| Category | Files |
|----------|-------|
| Unit Tests | 8 |
| Integration Tests | 4 |
| Fuzz Tests | 1 |
| Gas Benchmarks | 1 |
| Edge Cases | 2 |

**Total**: 16 test files, 353+ test functions

---

## 🌍 Market Opportunity

| Region | Savings Circle | Market Size |
|--------|---------------|-------------|
| 🇰🇪 Kenya | Chama | 300K+ groups, $4B+ |
| 🇳🇬 Nigeria | Ajo/Esusu | 50%+ informal workers |
| 🇿🇦 South Africa | Stokvel | R50B+/year ($2.7B) |
| 🌍 West Africa | Tontine/Susu | Widespread |

**Total Addressable Market**: $50B+/year

---

## 🔗 Links

- **Live App**: https://chamafi-hybrid-3.vercel.app
- **GitHub**: https://github.com/Mc01/claw-workspace
- **Celo Sepolia**: https://sepolia.celoscan.io
- **Documentation**: See README.md, CONTRACTS.md, FRONTEND.md

---

## ✅ Submission Checklist

- [x] Live app deployed and working
- [x] Smart contracts deployed and verified
- [x] Demo script prepared
- [x] Documentation complete
- [x] Tests documented
- [x] GitHub repository accessible

---

<p align="center">
  <strong>ChamaFi</strong><br>
  Savings circles, reimagined on Celo<br>
  Built with 💚 by Mc01
</p>

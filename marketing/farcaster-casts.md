# Farcaster Content — ChamaFi Launch

**Channel**: /celo, /miniapps, /dev
**Format**: Casts + Reply Templates

---

## Cast 1 — /celo Channel (Main Announcement)

---

just shipped: ChamaFi

turns Africa's $4B savings circle tradition into on-chain economies

how it works:
• create a chama with friends (pump.fun style bonding curve)
• graduate → ERC20 token + Uniswap V4 pool
• yield auto-compounds via Feather vaults
• AI agent manages daily ops (ERC-8004)

each chama is a mini commonwealth

built on @celo because:
✓ 15 local stablecoins (cKES, cNGN, cGHS...)
✓ sub-cent fees
✓ phone number → wallet mapping
✓ ERC-8004 live on mainnet

no other chain can do this

demo: https://chama.fi

frame: try creating your chama right in this cast 👇

---

## Cast 2 — /miniapps Channel

---

new Mini App: ChamaFi

group savings circles on @celo, now on @farcaster

what makes it special:
• create chamas with fc friends
• contribute → bonding curve pricing
• token drops when chama graduates
• full governance: proposals, voting, treasury

multi-surface by design:
→ MiniPay MiniApp (12M wallets, Africa-first)
→ Farcaster Mini App (share in feed)
→ web (full desktop)

embed the mini app in casts. friends join without leaving warpcast.

built with @celo native SDK actions (sendToken, swapToken, EIP-5792 batch txs)

📎 add the mini app: https://chama.fi

who's forming the first /celo chama? 

---

## Cast 3 — /dev Channel (Technical Deep Dive)

---

technical breakdown: ChamaFi's yield architecture

the problem: savings circles have idle capital

the solution: rehypothecation hooks on Uniswap V4

how:
1. chama token + stablecoin pair on V4
2. custom hook captures idle liquidity
3. routes to Feather (Morpho-based) vaults on @celo
4. yield auto-compounds → token price appreciation
5. LPs earn: vault yield + LP yield + token inflation

the P12YN bonding curve (polynomial n=1.2) selected after testing 6 curve types × 24 configs

governance: OpenZeppelin Governor + ERC20 votes

AI: ERC-8004 agent identity, uses @celo MCP server for onchain actions

contracts verified on celoscan. testnet live. mainnet soon.

repo: [TBD - add when public]

questions welcome. building in open.

---

## Cast 4 — /celo Channel (Ecosystem Alignment)

---

why ChamaFi chose @celo (and why we couldn't build anywhere else):

| feature | why it matters |
|--------|----------------|
| 15 local stablecoins | users save in cKES, cNGN, cGHS — not just USDC |
| fee abstraction | pay gas in stablecoins, no CELO required |
| phone mapping | SocialConnect — find chama members by phone |
| sub-cent fees | 700K+ daily active addresses can afford it |
| ERC-8004 | AI agent identity standard live on mainnet |
| x402 | HTTP 402 micropayments for agent services |
| MCP server | Model Context Protocol for AI assistants |

this stack is unmatched for emerging market financial inclusion

let's prove what's possible when we build for the next billion

#buildoncelo

---

## Reply Templates

### Common Question: "What is a Chama?"

> A chama is a traditional African savings circle — like a ROSCA (rotating savings and credit association). Members contribute regularly and take turns receiving the pooled amount. It's how millions save without banks. ChamaFi brings this on-chain with yield and governance.

---

### Common Question: "Is this live on mainnet?"

> Testnet is live now. Mainnet deployment pending final audit. Join our waitlist to be notified: https://chama.fi

---

### Common Question: "How is this different from HaloFi/GoodGhosting?"

> Great question! HaloFi was a great pioneer but archived in Nov 2024. ChamaFi differs:
> 
> • Each chama has its own ERC20 token and bonding curve
> • Uniswap V4 with rehypothecation hooks for yield
> • On-chain governance (proposals, voting)
> • AI agent management (ERC-8004)
> • Multi-platform: MiniPay + Farcaster + Web
> 
> We're building on their learnings for the next generation.

---

### Common Question: "What are the fees?"

> On @celo: sub-cent transaction fees. We don't charge additional protocol fees during the hackathon phase. Post-launch, a small % of yield may go to protocol treasury (governance decides).

---

### Common Question: "Can I create a Chama with my friends?"

> Yes! That's the whole point. Create a chama, invite friends via:
> • Share link
> • Phone number (SocialConnect)
> • Farcaster handle
> 
> Set your contribution schedule and go. The bonding curve rewards early contributors.

---

### Common Question: "Is it safe?"

> We're taking security seriously:
> • Contracts will be audited before mainnet
> • Using battle-tested libraries (OpenZeppelin, Uniswap V4)
> • Gradual rollout with deposit limits initially
> • Bug bounty program coming soon

---

### Common Question: "What yield can I expect?"

> Yield comes from Feather vaults (Morpho-based) on @celo:
> • FEATHERUSDC: ~5% APY
> • Plus LP fees
> • Plus token inflation rewards for active contributors
> 
> Real yield, no ponzi mechanics. All from productive DeFi.

---

### Common Question: "How do I get started?"

> 1. Visit https://chama.fi
> 2. Connect your wallet (MetaMask, MiniPay, or Farcaster)
> 3. Create or join a Chama
> 4. Contribute during incubation
> 5. Vote on proposals once graduated

---

## Engagement Tips

1. **Reply quickly** — first hour matters for algorithm
2. **Use embeds** — post the mini app URL directly, it renders in feed
3. **Cross-post to /africa** — relevant for user acquisition
4. **Quote cast builders** — engage with other Celo ecosystem projects
5. **Share screenshots** — visual proof of working product

// Contract addresses for the ChamaFi protocol
// Deployed on Celo Sepolia (11142220)
//
// ⚠️  NOTE: The DeployContinue deployment created mock tokens at the same
//     nonce-derived addresses as the first deployment (ChamaFactory, ChamaIncubation).
//     The ChamaFactory needs to be redeployed with Deploy.s.sol for full functionality.
//     Once redeployed, update the factory address below.

import type { Address } from 'viem';

export interface ChainContracts {
  factory: Address;
  chamaPoolManager: Address;
  featherYieldAdapter: Address;
  cUSD: Address;
  USDT: Address;
  CELO: Address;
}

const ZERO_ADDRESS: Address = '0x0000000000000000000000000000000000000000';

export const CONTRACT_ADDRESSES: Record<number, ChainContracts> = {
  // Celo Mainnet (42220)
  42220: {
    factory: ZERO_ADDRESS,
    chamaPoolManager: ZERO_ADDRESS,
    featherYieldAdapter: ZERO_ADDRESS,
    cUSD: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
    USDT: '0x48065fbBE25f71C928d2D4797C001d5E7a4111a8',
    CELO: ZERO_ADDRESS, // native
  },
  // Celo Sepolia Testnet (11142220) — deployed contracts
  11142220: {
    factory: '0xF5fF68ab2Bc0217C2135fc4EC25577AFE54C60ad' as Address,
    chamaPoolManager: '0x4e9f2C22f1d6d702735cf875E0583c2Bc71c2A44' as Address,
    featherYieldAdapter: '0x9D33A537645D62351d57510238ccF251A61b2cC2' as Address,
    // Mock tokens on Sepolia
    cUSD: '0x367cB784BF701587CA03bE93Ec29b76ffd430091' as Address,
    USDT: '0xF5fF68ab2Bc0217C2135fc4EC25577AFE54C60ad' as Address,
    CELO: '0x826BF3D7254AB8fE2ab080FB92e47f575993B861' as Address,
  },
  // Hardhat local
  31337: {
    factory: ZERO_ADDRESS,
    chamaPoolManager: ZERO_ADDRESS,
    featherYieldAdapter: ZERO_ADDRESS,
    cUSD: ZERO_ADDRESS,
    USDT: ZERO_ADDRESS,
    CELO: ZERO_ADDRESS,
  },
};

// Token options for creating chamas
export const TOKEN_OPTIONS = [
  { symbol: 'cUSD' as const, name: 'Celo Dollar', decimals: 18 },
  { symbol: 'USDT' as const, name: 'Tether USD', decimals: 6 },
  { symbol: 'CELO' as const, name: 'CELO', decimals: 18 },
] as const;

export type TokenSymbol = typeof TOKEN_OPTIONS[number]['symbol'];

export function getTokenAddress(chainId: number, symbol: TokenSymbol): Address {
  const addresses = CONTRACT_ADDRESSES[chainId];
  if (!addresses) return ZERO_ADDRESS;
  return addresses[symbol] ?? ZERO_ADDRESS;
}

export function getTokenDecimals(symbol: TokenSymbol): number {
  const token = TOKEN_OPTIONS.find(t => t.symbol === symbol);
  return token?.decimals ?? 18;
}

export function getFactoryAddress(chainId: number): Address {
  return CONTRACT_ADDRESSES[chainId]?.factory ?? ZERO_ADDRESS;
}

export function getChamaPoolManagerAddress(chainId: number): Address {
  return CONTRACT_ADDRESSES[chainId]?.chamaPoolManager ?? ZERO_ADDRESS;
}

export function getFeatherYieldAdapterAddress(chainId: number): Address {
  return CONTRACT_ADDRESSES[chainId]?.featherYieldAdapter ?? ZERO_ADDRESS;
}

// Block explorer URLs
const EXPLORER_BASE: Record<number, string> = {
  42220: 'https://celoscan.io',
  11142220: 'https://celo-sepolia.celoscan.io',
};

export function getExplorerUrl(chainId: number, type: 'address' | 'tx', value: string): string {
  const base = EXPLORER_BASE[chainId];
  if (!base) return '#';
  return `${base}/${type}/${value}`;
}

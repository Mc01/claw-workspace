// Contract addresses - using environment variables with fallbacks for Celo
export const CONTRACT_ADDRESSES = {
  // Celo Mainnet (42220)
  42220: {
    factory: import.meta.env.VITE_FACTORY_ADDRESS || '0x0000000000000000000000000000000000000000',
    // Celo stablecoins
    cUSD: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
    USDC: '0xceba9300f2b948710d2653dd7b07f33a8b32118c',
    USDT: '0x48065fbBE25f71C928d2D4797C001d5E7a4111a8',
  },
  // Celo Sepolia Testnet (11142220)
  11142220: {
    factory: import.meta.env.VITE_FACTORY_ADDRESS_SEPOLIA || '0x0000000000000000000000000000000000000000',
    cUSD: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
    USDC: '0x2F25deB385843C70ad8D3dD137A7F44f23bF8622',
    USDT: '0x7226D2c9D8cD574E2C2727c656B923F5d5eC9e2D',
  },
  // Hardhat local
  31337: {
    factory: import.meta.env.VITE_FACTORY_ADDRESS_LOCAL || '0x0000000000000000000000000000000000000000',
    cUSD: '0x0000000000000000000000000000000000000000',
    USDC: '0x0000000000000000000000000000000000000000',
    USDT: '0x0000000000000000000000000000000000000000',
  },
} as const;

// Token options for creating chamas
export const TOKEN_OPTIONS = [
  { symbol: 'cUSD', name: 'Celo Dollar', decimals: 18 },
  { symbol: 'USDC', name: 'USD Coin', decimals: 6 },
  { symbol: 'USDT', name: 'Tether USD', decimals: 6 },
  { symbol: 'CELO', name: 'CELO', decimals: 18 },
] as const;

export type TokenSymbol = typeof TOKEN_OPTIONS[number]['symbol'];

export function getTokenAddress(chainId: number, symbol: TokenSymbol): string {
  if (symbol === 'CELO') return '0x0000000000000000000000000000000000000000';
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  if (!addresses) return '0x0000000000000000000000000000000000000000';
  return (addresses as Record<string, string>)[symbol.toLowerCase()] || '0x0000000000000000000000000000000000000000';
}

export function getFactoryAddress(chainId: number): string {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  return addresses?.factory || '0x0000000000000000000000000000000000000000';
}

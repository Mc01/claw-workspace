import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { celo, celoSepolia, hardhat } from 'wagmi/chains';

// Supported chains — Celo mainnet + Sepolia testnet
export const supportedChains = [celo, celoSepolia, hardhat] as const;

// Wagmi config with RainbowKit
export const config = getDefaultConfig({
  appName: 'ChamaFi',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: supportedChains,
  transports: {
    [celo.id]: http('https://forno.celo.org'),
    [celoSepolia.id]: http('https://forno.celo-sepolia.celo-testnet.org'),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
});

// Check if MiniPay
export function isMiniPay(): boolean {
  if (typeof window === 'undefined') return false;
  return (window as unknown as { ethereum?: { isMiniPay?: boolean } }).ethereum?.isMiniPay === true;
}

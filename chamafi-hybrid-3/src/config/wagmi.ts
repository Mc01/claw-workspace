import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { celo, celoAlfajores, hardhat } from 'wagmi/chains';

// Supported chains - Celo only
export const supportedChains = [celo, celoAlfajores, hardhat] as const;

// Wagmi config with RainbowKit
export const config = getDefaultConfig({
  appName: 'ChamaFi',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: supportedChains,
  transports: {
    [celo.id]: http('https://forno.celo.org'),
    [celoAlfajores.id]: http('https://alfajores-forno.celo-testnet.org'),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
});

// Check if MiniPay
export function isMiniPay(): boolean {
  if (typeof window === 'undefined') return false;
  return (window as any).ethereum?.isMiniPay === true;
}

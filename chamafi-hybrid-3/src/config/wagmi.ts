import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { celo, celoSepolia, hardhat } from 'wagmi/chains';

// Override chain metadata
const CELO_ICON_SVG = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2228%22%20height%3D%2228%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%2214%22%20cy%3D%2214%22%20r%3D%2214%22%20fill%3D%22%23FCFF52%22%2F%3E%3Cpath%20d%3D%22M21%207H7v14h14v-4.887h-2.325a5.126%205.126%200%200%201-4.664%203.023c-2.844%200-5.147-2.325-5.147-5.147-.003-2.822%202.303-5.125%205.147-5.125%202.102%200%203.904%201.28%204.704%203.104H21V7Z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E";

const celoSepoliaChain = {
  ...celoSepolia,
  name: 'Celo Sepolia',
  iconUrl: CELO_ICON_SVG,
  iconBackground: '#FCFF52',
} as const;

const localhostChain = {
  ...hardhat,
  name: 'Localhost',
} as const;

// Supported chains — Celo mainnet + Sepolia testnet + Localhost
export const supportedChains = [celo, celoSepoliaChain, localhostChain] as const;

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

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { isMiniPay } from '../config/wagmi';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export function ConnectWallet() {
  const { isConnected } = useAccount();

  // Auto-connect for MiniPay
  useEffect(() => {
    if (isMiniPay() && !isConnected) {
      // MiniPay handles connection automatically
    }
  }, [isConnected]);

  return (
    <ConnectButton 
      showBalance={false}
      chainStatus="icon"
      accountStatus="address"
    />
  );
}

// Surface detection utility for ChamaFi
// Detects MiniPay, Farcaster, or Web environments

export const detectSurface = () => {
  // Check for MiniPay environment
  if (typeof window !== 'undefined' && (window as any).ethereum?.isMiniPay) {
    return 'minipay';
  }

  // Check for Farcaster environment
  if (typeof window !== 'undefined' && (window as any).farcaster) {
    return 'farcaster';
  }

  // Default to web
  return 'web';
};

export const isMiniPay = () => {
  return typeof window !== 'undefined' && (window as any).ethereum?.isMiniPay === true;
};

export const isFarcaster = () => {
  return typeof window !== 'undefined' && (window as any).farcaster !== undefined;
};

export const isWeb = () => {
  return !isMiniPay() && !isFarcaster();
};
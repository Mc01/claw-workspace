import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string | undefined): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatAmount(value: bigint | undefined, decimals: number = 18): string {
  if (!value) return '0';
  const divisor = BigInt(10 ** decimals);
  const integerPart = value / divisor;
  const fractionalPart = value % divisor;
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const trimmed = fractionalStr.replace(/0+$/, '');
  return trimmed ? `${integerPart}.${trimmed}` : integerPart.toString();
}

export function formatPercentage(value: bigint | undefined): string {
  if (!value) return '0%';
  return `${Number(value) / 100}%`;
}

export function formatDate(timestamp: bigint | undefined): string {
  if (!timestamp) return '-';
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(timestamp: bigint | undefined): string {
  if (!timestamp) return '-';
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDaysRemaining(timestamp: bigint | undefined): number {
  if (!timestamp) return 0;
  const now = Math.floor(Date.now() / 1000);
  const diff = Number(timestamp) - now;
  return Math.max(0, Math.floor(diff / 86400));
}

export function isExpired(timestamp: bigint | undefined): boolean {
  if (!timestamp) return false;
  const now = Math.floor(Date.now() / 1000);
  return Number(timestamp) < now;
}

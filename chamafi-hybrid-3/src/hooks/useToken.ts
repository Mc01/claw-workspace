import { useReadContract, useWriteContract } from 'wagmi';
import { ERC20ABI } from '../abi';
import { parseUnits } from 'viem';

export function useToken(tokenAddress: string | null) {
  const enabled = !!tokenAddress && tokenAddress !== '0x0000000000000000000000000000000000000000';

  const { data: name } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'name',
    query: { enabled },
  });

  const { data: symbol } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'symbol',
    query: { enabled },
  });

  const { data: decimals } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'decimals',
    query: { enabled },
  });

  const { data: totalSupply } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'totalSupply',
    query: { enabled },
  });

  return {
    name,
    symbol,
    decimals,
    totalSupply,
  };
}

export function useTokenBalance(tokenAddress: string | null, userAddress: string | undefined) {
  const enabled = !!tokenAddress && !!userAddress && tokenAddress !== '0x0000000000000000000000000000000000000000';

  const { data: balance, isLoading, refetch } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress as `0x${string}`] : undefined,
    query: { enabled },
  });

  return {
    balance,
    isLoading,
    refetch,
  };
}

export function useTokenAllowance(
  tokenAddress: string | null,
  ownerAddress: string | undefined,
  spenderAddress: string | undefined
) {
  const enabled = !!tokenAddress && !!ownerAddress && !!spenderAddress && 
    tokenAddress !== '0x0000000000000000000000000000000000000000';

  const { data: allowance, isLoading, refetch } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: ownerAddress && spenderAddress ? [ownerAddress as `0x${string}`, spenderAddress as `0x${string}`] : undefined,
    query: { enabled },
  });

  const { writeContract, isPending, isSuccess } = useWriteContract();

  const approve = async (amount: string, decimals: number = 18) => {
    if (!enabled) return;
    await writeContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20ABI,
      functionName: 'approve',
      args: [spenderAddress as `0x${string}`, parseUnits(amount, decimals)],
    });
  };

  return {
    allowance,
    isLoading,
    refetch,
    approve,
    isPending,
    isSuccess,
  };
}

import { useReadContract, useWriteContract, useChainId } from 'wagmi';
import { ChamaFactoryABI } from '../abi';
import { getFactoryAddress } from '../config/contracts';
import { parseUnits } from 'viem';

export function useChamaFactory() {
  const chainId = useChainId();
  const factoryAddress = getFactoryAddress(chainId);

  // Get all chamas
  const { data: allChamas, isLoading: isLoadingChamas, refetch: refetchChamas } = useReadContract({
    address: factoryAddress as `0x${string}`,
    abi: ChamaFactoryABI,
    functionName: 'getAllChamas',
    query: {
      enabled: factoryAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  // Get chama count
  const { data: chamaCount } = useReadContract({
    address: factoryAddress as `0x${string}`,
    abi: ChamaFactoryABI,
    functionName: 'chamaCount',
    query: {
      enabled: factoryAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    allChamas,
    chamaCount,
    isLoadingChamas,
    refetchChamas,
    factoryAddress,
  };
}

export function useCreateChama() {
  const chainId = useChainId();
  const factoryAddress = getFactoryAddress(chainId);
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  const createChama = async (
    name: string,
    tokenAddress: string,
    targetAmount: string,
    deadline: number, // Unix timestamp
    minContribution: string,
    maxMembers: number
  ) => {
    await writeContract({
      address: factoryAddress as `0x${string}`,
      abi: ChamaFactoryABI,
      functionName: 'createChama',
      args: [
        name,
        tokenAddress as `0x${string}`,
        parseUnits(targetAmount, 18),
        BigInt(deadline),
        parseUnits(minContribution, 18),
        BigInt(maxMembers),
      ],
    });
  };

  return {
    createChama,
    isPending,
    isSuccess,
    isError,
    error,
  };
}

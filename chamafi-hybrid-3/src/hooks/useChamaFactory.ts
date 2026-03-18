import { useReadContract, useWriteContract, useChainId } from 'wagmi';
import { ChamaFactoryABI } from '../abi';
import { getFactoryAddress, getTokenDecimals, type TokenSymbol } from '../config/contracts';
import { parseUnits } from 'viem';
import type { Address } from 'viem';
import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { celoSepolia } from 'viem/chains';
import { ChamaIncubationABI } from '../abi';

const ZERO_ADDRESS: Address = '0x0000000000000000000000000000000000000000';

export function useChamaFactory() {
  const chainId = useChainId();
  const factoryAddress = getFactoryAddress(chainId);
  const enabled = factoryAddress !== ZERO_ADDRESS;

  // Get all chamas
  const { data: allChamas, isLoading: isLoadingChamas, refetch: refetchChamas } = useReadContract({
    address: factoryAddress,
    abi: ChamaFactoryABI,
    functionName: 'getAllChamas',
    query: { enabled },
  });

  // Get chama count
  const { data: chamaCount } = useReadContract({
    address: factoryAddress,
    abi: ChamaFactoryABI,
    functionName: 'getChamaCount',
    query: { enabled },
  });

  return {
    allChamas: allChamas as Address[] | undefined,
    chamaCount: chamaCount as bigint | undefined,
    isLoadingChamas,
    refetchChamas,
    factoryAddress,
  };
}

export function useCreateChama() {
  const chainId = useChainId();
  const factoryAddress = getFactoryAddress(chainId);
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  /**
   * Create a new Chama via the ChamaFactory.
   * Maps to ChamaFactory.createChama(ChamaParams) where:
   *   ChamaParams { name, asset, targetCapital, minMembers, deadline }
   */
  const createChama = async (
    name: string,
    asset: Address,
    targetAmount: string,
    tokenSymbol: TokenSymbol,
    minMembers: number,
    deadline: number, // Unix timestamp, 0 = no deadline
  ) => {
    const decimals = getTokenDecimals(tokenSymbol);

    await writeContract({
      address: factoryAddress,
      abi: ChamaFactoryABI,
      functionName: 'createChama',
      args: [
        {
          name,
          asset,
          targetCapital: parseUnits(targetAmount, decimals),
          minMembers,
          deadline: BigInt(deadline),
        },
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

// Helper hook to filter chamas by user membership
export function useUserChamas(
  allChamas: Address[] | undefined,
  userAddress: Address | undefined
) {
  const [userChamas, setUserChamas] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!allChamas || !userAddress || allChamas.length === 0) {
      setUserChamas([]);
      return;
    }

    const checkMembership = async () => {
      setIsLoading(true);
      try {
        const publicClient = createPublicClient({
          chain: celoSepolia,
          transport: http(),
        });

        const membershipResults = await Promise.all(
          allChamas.map(async (chamaAddress) => {
            try {
              const isMember = await publicClient.readContract({
                address: chamaAddress,
                abi: ChamaIncubationABI,
                functionName: 'isMember',
                args: [userAddress],
              });
              return { address: chamaAddress, isMember };
            } catch {
              return { address: chamaAddress, isMember: false };
            }
          })
        );

        const filtered = membershipResults
          .filter((result) => result.isMember)
          .map((result) => result.address);

        setUserChamas(filtered);
      } catch (error) {
        console.error('Error checking memberships:', error);
        setUserChamas([]);
      } finally {
        setIsLoading(false);
      }
    };

    checkMembership();
  }, [allChamas, userAddress]);

  return { userChamas, isLoading };
}

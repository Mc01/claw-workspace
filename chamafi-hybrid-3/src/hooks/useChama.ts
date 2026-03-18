import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { ChamaIncubationABI } from '../abi';
import { parseUnits } from 'viem';
import type { Address } from 'viem';
import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { celoSepolia } from 'viem/chains';

const ZERO_ADDRESS: Address = '0x0000000000000000000000000000000000000000';

interface ChamaInfo {
  address: Address;
  name?: string;
  graduated?: boolean;
}

export function useChama(chamaAddress: string | null) {
  const { address: userAddress } = useAccount();
  const enabled = !!chamaAddress && chamaAddress !== ZERO_ADDRESS;
  const addr = chamaAddress as Address;

  // Individual field getters matching the deployed ChamaIncubation contract
  const { data: chamaName, isLoading: isLoadingName } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'name',
    query: { enabled },
  });

  const { data: asset, isLoading: isLoadingAsset } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'asset',
    query: { enabled },
  });

  const { data: targetCapital, isLoading: isLoadingTarget } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'targetCapital',
    query: { enabled },
  });

  const { data: minMembers } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'minMembers',
    query: { enabled },
  });

  const { data: deadline, isLoading: isLoadingDeadline } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'deadline',
    query: { enabled },
  });

  const { data: chamaToken } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'chamaToken',
    query: { enabled },
  });

  // Progress: returns (current, target, percentage 0-100)
  const { data: progress, isLoading: isLoadingProgress } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'getProgress',
    query: { enabled },
  });

  const { data: graduated, isLoading: isLoadingGraduated } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'graduated',
    query: { enabled },
  });

  const { data: memberCount, isLoading: isLoadingMemberCount } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'getMemberCount',
    query: { enabled },
  });

  const { data: members, isLoading: isLoadingMembers } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'getMembers',
    query: { enabled },
  });

  const { data: isMember, isLoading: isLoadingIsMember } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'isMember',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: enabled && !!userAddress },
  });

  const { data: userContribution, isLoading: isLoadingContribution } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'getMemberContribution',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: enabled && !!userAddress },
  });

  const { data: creator, isLoading: isLoadingCreator } = useReadContract({
    address: addr,
    abi: ChamaIncubationABI,
    functionName: 'creator',
    query: { enabled },
  });

  return {
    // Individual fields from the contract
    chamaName: chamaName as string | undefined,
    asset: asset as Address | undefined,
    targetCapital: targetCapital as bigint | undefined,
    minMembers: minMembers as number | undefined,
    deadline: deadline as bigint | undefined,
    chamaToken: chamaToken as Address | undefined,
    // Progress: { current, target, percentage(0-100) }
    progress: progress
      ? {
          current: (progress as readonly [bigint, bigint, bigint])[0],
          target: (progress as readonly [bigint, bigint, bigint])[1],
          percentage: (progress as readonly [bigint, bigint, bigint])[2],
        }
      : undefined,
    graduated: graduated as boolean | undefined,
    memberCount: memberCount as bigint | undefined,
    members: members as Address[] | undefined,
    isMember: isMember as boolean | undefined,
    userContribution: userContribution as bigint | undefined,
    creator: creator as Address | undefined,
    isLoading:
      isLoadingName ||
      isLoadingAsset ||
      isLoadingTarget ||
      isLoadingDeadline ||
      isLoadingProgress ||
      isLoadingGraduated ||
      isLoadingMemberCount ||
      isLoadingMembers ||
      isLoadingIsMember ||
      isLoadingContribution ||
      isLoadingCreator,
  };
}

// Batch fetch chama details (name and graduated status) for filtering
export function useChamaDetailsBatch(chamaAddresses: Address[] | undefined) {
  const [chamaDetails, setChamaDetails] = useState<ChamaInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!chamaAddresses || chamaAddresses.length === 0) {
      setChamaDetails([]);
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const publicClient = createPublicClient({
          chain: celoSepolia,
          transport: http(),
        });

        const details = await Promise.all(
          chamaAddresses.map(async (address) => {
            try {
              const [name, graduated] = await Promise.all([
                publicClient.readContract({
                  address,
                  abi: ChamaIncubationABI,
                  functionName: 'name',
                }).catch(() => undefined),
                publicClient.readContract({
                  address,
                  abi: ChamaIncubationABI,
                  functionName: 'graduated',
                }).catch(() => false),
              ]);
              return { address, name: name as string | undefined, graduated: graduated as boolean };
            } catch {
              return { address, name: undefined, graduated: false };
            }
          })
        );

        setChamaDetails(details);
      } catch (error) {
        console.error('Error fetching chama details:', error);
        setChamaDetails([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [chamaAddresses]);

  return { chamaDetails, isLoading };
}

export function useJoinChama(chamaAddress: string | null) {
  const enabled = !!chamaAddress && chamaAddress !== ZERO_ADDRESS;
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  const join = async () => {
    if (!enabled) return;
    await writeContract({
      address: chamaAddress as Address,
      abi: ChamaIncubationABI,
      functionName: 'join',
    });
  };

  return { join, isPending, isSuccess, isError, error };
}

export function useContribute(chamaAddress: string | null) {
  const enabled = !!chamaAddress && chamaAddress !== ZERO_ADDRESS;
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  const contribute = async (amount: string, decimals: number = 18) => {
    if (!enabled) return;
    await writeContract({
      address: chamaAddress as Address,
      abi: ChamaIncubationABI,
      functionName: 'contribute',
      args: [parseUnits(amount, decimals)],
    });
  };

  return { contribute, isPending, isSuccess, isError, error };
}

export function useRefund(chamaAddress: string | null) {
  const enabled = !!chamaAddress && chamaAddress !== ZERO_ADDRESS;
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  const refund = async () => {
    if (!enabled) return;
    await writeContract({
      address: chamaAddress as Address,
      abi: ChamaIncubationABI,
      functionName: 'refund',
    });
  };

  return { refund, isPending, isSuccess, isError, error };
}

export function useGraduate(chamaAddress: string | null) {
  const enabled = !!chamaAddress && chamaAddress !== ZERO_ADDRESS;
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  const graduate = async () => {
    if (!enabled) return;
    await writeContract({
      address: chamaAddress as Address,
      abi: ChamaIncubationABI,
      functionName: 'graduate',
    });
  };

  return { graduate, isPending, isSuccess, isError, error };
}

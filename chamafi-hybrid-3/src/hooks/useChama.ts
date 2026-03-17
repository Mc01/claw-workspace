import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { ChamaIncubationABI } from '../abi';
import { parseUnits } from 'viem';

export function useChama(chamaAddress: string | null) {
  const { address: userAddress } = useAccount();
  const enabled = !!chamaAddress && chamaAddress !== '0x0000000000000000000000000000000000000000';

  // Get chama params
  const { data: params, isLoading: isLoadingParams } = useReadContract({
    address: chamaAddress as `0x${string}`,
    abi: ChamaIncubationABI,
    functionName: 'params',
    query: { enabled },
  });

  // Get progress
  const { data: progress, isLoading: isLoadingProgress } = useReadContract({
    address: chamaAddress as `0x${string}`,
    abi: ChamaIncubationABI,
    functionName: 'getProgress',
    query: { enabled },
  });

  // Get graduated status
  const { data: graduated, isLoading: isLoadingGraduated } = useReadContract({
    address: chamaAddress as `0x${string}`,
    abi: ChamaIncubationABI,
    functionName: 'graduated',
    query: { enabled },
  });

  // Get member count
  const { data: memberCount, isLoading: isLoadingMemberCount } = useReadContract({
    address: chamaAddress as `0x${string}`,
    abi: ChamaIncubationABI,
    functionName: 'getMemberCount',
    query: { enabled },
  });

  // Get members
  const { data: members, isLoading: isLoadingMembers } = useReadContract({
    address: chamaAddress as `0x${string}`,
    abi: ChamaIncubationABI,
    functionName: 'getMembers',
    query: { enabled },
  });

  // Check if user is member
  const { data: isMember, isLoading: isLoadingIsMember } = useReadContract({
    address: chamaAddress as `0x${string}`,
    abi: ChamaIncubationABI,
    functionName: 'isMember',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: enabled && !!userAddress },
  });

  // Get user contribution
  const { data: userContribution, isLoading: isLoadingContribution } = useReadContract({
    address: chamaAddress as `0x${string}`,
    abi: ChamaIncubationABI,
    functionName: 'getMemberContribution',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: enabled && !!userAddress },
  });

  // Get creator
  const { data: creator, isLoading: isLoadingCreator } = useReadContract({
    address: chamaAddress as `0x${string}`,
    abi: ChamaIncubationABI,
    functionName: 'creator',
    query: { enabled },
  });

  return {
    params: params ? {
      targetAmount: params[0],
      deadline: params[1],
      minContribution: params[2],
      tokenAddress: params[3],
      feeCurrency: params[4],
    } : undefined,
    progress: progress ? {
      current: progress[0],
      target: progress[1],
      percentage: progress[2],
    } : undefined,
    graduated,
    memberCount,
    members,
    isMember,
    userContribution,
    creator,
    isLoading: isLoadingParams || isLoadingProgress || isLoadingGraduated || isLoadingMemberCount || isLoadingMembers || isLoadingIsMember || isLoadingContribution || isLoadingCreator,
  };
}

export function useJoinChama(chamaAddress: string | null) {
  const enabled = !!chamaAddress && chamaAddress !== '0x0000000000000000000000000000000000000000';
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  const join = async () => {
    if (!enabled) return;
    await writeContract({
      address: chamaAddress as `0x${string}`,
      abi: ChamaIncubationABI,
      functionName: 'join',
    });
  };

  return { join, isPending, isSuccess, isError, error };
}

export function useContribute(chamaAddress: string | null) {
  const enabled = !!chamaAddress && chamaAddress !== '0x0000000000000000000000000000000000000000';
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  const contribute = async (amount: string, decimals: number = 18) => {
    if (!enabled) return;
    await writeContract({
      address: chamaAddress as `0x${string}`,
      abi: ChamaIncubationABI,
      functionName: 'contribute',
      args: [parseUnits(amount, decimals)],
    });
  };

  return { contribute, isPending, isSuccess, isError, error };
}

export function useRefund(chamaAddress: string | null) {
  const enabled = !!chamaAddress && chamaAddress !== '0x0000000000000000000000000000000000000000';
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  const refund = async () => {
    if (!enabled) return;
    await writeContract({
      address: chamaAddress as `0x${string}`,
      abi: ChamaIncubationABI,
      functionName: 'refund',
    });
  };

  return { refund, isPending, isSuccess, isError, error };
}

export function useGraduate(chamaAddress: string | null) {
  const enabled = !!chamaAddress && chamaAddress !== '0x0000000000000000000000000000000000000000';
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  const graduate = async () => {
    if (!enabled) return;
    await writeContract({
      address: chamaAddress as `0x${string}`,
      abi: ChamaIncubationABI,
      functionName: 'graduate',
    });
  };

  return { graduate, isPending, isSuccess, isError, error };
}

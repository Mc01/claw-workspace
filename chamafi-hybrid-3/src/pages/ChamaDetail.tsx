import { useParams, Link } from 'react-router-dom';
import { useAccount, useChainId } from 'wagmi';
import {
  ArrowLeft, Users, Clock, User, ExternalLink,
  Target, TrendingUp, Loader2, AlertTriangle, CheckCircle,
  Coins, GraduationCap, Unlock,
} from 'lucide-react';
import { useChama, useJoinChama, useContribute, useRefund, useGraduate } from '../hooks/useChama';
import { ProgressBar } from '../components/ProgressBar';
import { formatAddress, formatAmount, formatDateTime, isExpired, getDaysRemaining, cn } from '../lib/utils';
import { getExplorerUrl } from '../config/contracts';
import { useState, useEffect } from 'react';
import { useToast } from '../components/Toast';
import { useTokenAllowance } from '../hooks/useToken';
import { parseUnits } from 'viem';

export function ChamaDetail() {
  const { address } = useParams<{ address: string }>();
  const { address: userAddress } = useAccount();
  const chainId = useChainId();
  const [contributionAmount, setContributionAmount] = useState('');
  const { addToast } = useToast();

  const {
    chamaName,
    asset,
    targetCapital,
    minMembers,
    deadline,
    chamaToken,
    progress,
    graduated,
    memberCount,
    members,
    isMember,
    userContribution,
    creator,
    isLoading,
  } = useChama(address || null);

  const { join, isPending: isJoining } = useJoinChama(address || null);
  const { contribute, isPending: isContributing } = useContribute(address || null);
  const { refund, isPending: isRefunding } = useRefund(address || null);
  const { graduate, isPending: isGraduating } = useGraduate(address || null);

  // Token approval for contributions
  const { 
    allowance, 
    refetch: refetchAllowance, 
    approve, 
    isPending: isApproving 
  } = useTokenAllowance(
    asset || null,
    userAddress,
    address
  );

  const expired = isExpired(deadline);
  const daysLeft = getDaysRemaining(deadline);
  const hasContributed = userContribution !== undefined && userContribution > BigInt(0);
  // getProgress returns percentage 0–100
  const pct = Number(progress?.percentage || 0);
  const targetReached = pct >= 100;
  const isCreator = creator && userAddress && creator.toLowerCase() === userAddress.toLowerCase();

  // Check if approval is needed
  const needsApproval = (() => {
    if (!contributionAmount || !allowance) return false;
    try {
      const amount = parseUnits(contributionAmount, 18);
      return allowance < amount;
    } catch {
      return false;
    }
  })();

  const handleContribute = async () => {
    if (!contributionAmount) return;
    addToast('Submitting contribution... Confirm in wallet', 'pending', 0);
    try {
      await contribute(contributionAmount, 18);
      addToast('Contribution successful!', 'success');
      setContributionAmount('');
      refetchAllowance();
    } catch {
      addToast('Contribution failed', 'error');
    }
  };

  const handleApprove = async () => {
    if (!contributionAmount) return;
    addToast('Approving tokens... Confirm in wallet', 'pending', 0);
    try {
      // Approve a large amount to avoid future approvals
      await approve('1000000', 18);
      addToast('Approval successful! You can now contribute.', 'success');
      refetchAllowance();
    } catch {
      addToast('Approval failed', 'error');
    }
  };

  const handleJoin = async () => {
    addToast('Joining Chama... Confirm in wallet', 'pending', 0);
    try {
      await join();
      addToast('Joined successfully!', 'success');
    } catch {
      addToast('Failed to join', 'error');
    }
  };

  const handleRefund = async () => {
    addToast('Claiming refund... Confirm in wallet', 'pending', 0);
    try {
      await refund();
      addToast('Refund claimed!', 'success');
    } catch {
      addToast('Refund failed', 'error');
    }
  };

  const handleGraduate = async () => {
    addToast('Graduating Chama... Confirm in wallet', 'pending', 0);
    try {
      await graduate();
      addToast('Chama graduated successfully!', 'success');
    } catch {
      addToast('Graduation failed', 'error');
    }
  };

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!address) {
    return (
      <div className="glass-card p-12 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-400/60" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Chama Not Found</h2>
        <p className="text-white/40 mb-6">This Chama doesn&apos;t exist or couldn&apos;t be loaded.</p>
        <Link to="/app/discover" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Discover
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Back Link */}
      <Link
        to="/app/discover"
        className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Discover
      </Link>

      {/* Header Card */}
      <div className="glass-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {chamaName || `Chama #${address.slice(-6)}`}
            </h1>
            <p className="text-sm text-white/30 font-mono">
              {formatAddress(address)}
            </p>
          </div>
          <span className={cn(
            graduated ? "badge-graduated" : expired ? "badge-expired" : "badge-active",
            "self-start text-sm px-4 py-1.5"
          )}>
            {graduated ? '🏆 Graduated' : expired ? '⏰ Expired' : '🟢 Active'}
          </span>
        </div>

        {/* Large progress visualization */}
        <div className="glass-card p-6 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/50 text-sm font-medium">Savings Progress</span>
            <span className={cn(
              "text-2xl font-bold",
              pct >= 100 ? "text-amber-400" : "text-primary-400"
            )}>
              {pct.toFixed(1)}%
            </span>
          </div>
          <ProgressBar
            current={progress?.current}
            target={progress?.target}
            percentage={progress?.percentage}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="w-5 h-5 text-blue-400" />}
          label="Members"
          value={memberCount ? memberCount.toString() : '0'}
        />
        <StatCard
          icon={<Clock className="w-5 h-5 text-amber-400" />}
          label={expired ? 'Status' : deadline ? 'Time Left' : 'Deadline'}
          value={expired ? 'Ended' : deadline ? `${daysLeft} days` : 'No deadline'}
        />
        <StatCard
          icon={<Target className="w-5 h-5 text-primary-400" />}
          label="Target"
          value={formatAmount(targetCapital, 18)}
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
          label="Raised"
          value={formatAmount(progress?.current, 18)}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Actions */}
        <div className="space-y-6">
          {/* Join Section */}
          {!isMember && !graduated && !expired && (
            <ActionCard title="Join Chama" icon={<Users className="w-5 h-5 text-primary-400" />}>
              <p className="text-white/40 text-sm mb-4">
                Join this savings group to start contributing towards the goal.
              </p>
              <button
                onClick={handleJoin}
                disabled={isJoining}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                {isJoining ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join Chama'
                )}
              </button>
            </ActionCard>
          )}

          {/* Contribute Section */}
          {isMember && !graduated && !expired && (
            <ActionCard title="Contribute" icon={<Coins className="w-5 h-5 text-primary-400" />}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    className="input-dark"
                    placeholder="Enter amount"
                    min="0.01"
                    step="0.01"
                  />
                </div>
                
                {/* Approval UI */}
                {needsApproval ? (
                  <button
                    onClick={handleApprove}
                    disabled={isApproving || !contributionAmount}
                    className="w-full btn-secondary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isApproving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4" />
                        Approve Tokens
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleContribute}
                    disabled={isContributing || !contributionAmount}
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isContributing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      'Contribute'
                    )}
                  </button>
                )}
                
                {needsApproval && (
                  <p className="text-xs text-amber-400/80">
                    You need to approve tokens before contributing.
                  </p>
                )}
              </div>
            </ActionCard>
          )}

          {/* Graduate Section - Only for creator when target reached */}
          {isCreator && targetReached && !graduated && !expired && (
            <ActionCard title="Graduate Chama" icon={<GraduationCap className="w-5 h-5 text-amber-400" />}>
              <p className="text-white/40 text-sm mb-4">
                Target reached! Graduate this Chama to mint tokens and distribute to members.
              </p>
              <button
                onClick={handleGraduate}
                disabled={isGraduating}
                className="w-full py-3 rounded-xl font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-all flex items-center justify-center gap-2"
              >
                {isGraduating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Graduating...
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-4 h-4" />
                    Graduate Now
                  </>
                )}
              </button>
            </ActionCard>
          )}

          {/* Refund Section */}
          {isMember && expired && !graduated && hasContributed && (
            <ActionCard title="Claim Refund" icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}>
              <p className="text-white/40 text-sm mb-4">
                This Chama did not reach its target. You can claim your contribution back.
              </p>
              <button
                onClick={handleRefund}
                disabled={isRefunding}
                className="w-full py-3 rounded-xl font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-all flex items-center justify-center gap-2"
              >
                {isRefunding ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Claim Refund'
                )}
              </button>
            </ActionCard>
          )}

          {/* Your Contribution */}
          {isMember && (
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-400" />
                Your Contribution
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-white/40">Total Contributed</span>
                <span className="text-2xl font-bold text-primary-400">
                  {formatAmount(userContribution, 18)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Chama Info */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4">Chama Details</h3>
            <div className="space-y-0">
              <DetailRow label="Creator" value={formatAddress(creator)} mono />
              <DetailRow label="Asset" value={formatAddress(asset)} mono />
              <DetailRow label="Min Members" value={minMembers?.toString() || '—'} />
              {chamaToken && (
                <DetailRow label="Chama Token" value={formatAddress(chamaToken)} mono />
              )}
              <DetailRow
                label="Deadline"
                value={deadline && deadline > BigInt(0) ? formatDateTime(deadline) : 'No deadline'}
                last
              />
            </div>
          </div>

          {/* Members List */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4">
              Members ({memberCount ? memberCount.toString() : '0'})
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {members && members.length > 0 ? (
                members.map((member) => (
                  <div
                    key={member}
                    className="flex items-center gap-2 py-2.5 px-3 bg-white/[0.03] rounded-xl"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-white/40" />
                    </div>
                    <span className="font-mono text-sm text-white/60 flex-1">
                      {formatAddress(member)}
                    </span>
                    {member === creator && (
                      <span className="badge-active text-[10px]">Creator</span>
                    )}
                    {member === userAddress && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/60">
                        You
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-white/30 text-sm text-center py-4">No members yet</p>
              )}
            </div>
          </div>

          {/* View on Explorer */}
          <a
            href={getExplorerUrl(chainId, 'address', address)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full flex items-center justify-center gap-2 py-3 text-sm"
          >
            View on Celo Explorer
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-white/40 font-medium">{label}</span>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}

function ActionCard({ title, icon, children }: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card p-6">
      <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}

function DetailRow({ label, value, mono, last }: {
  label: string;
  value: string;
  mono?: boolean;
  last?: boolean;
}) {
  return (
    <div className={cn(
      "flex justify-between items-center py-3",
      !last && "border-b border-white/[0.06]"
    )}>
      <span className="text-white/40 text-sm">{label}</span>
      <span className={cn("text-sm text-white/80", mono && "font-mono")}>{value}</span>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="skeleton h-4 w-32" />
      <div className="glass-card p-8">
        <div className="skeleton h-8 w-48 mb-4" />
        <div className="skeleton h-4 w-32 mb-8" />
        <div className="skeleton h-24 w-full rounded-xl" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-4">
            <div className="skeleton h-4 w-16 mb-2" />
            <div className="skeleton h-6 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

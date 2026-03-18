import { useParams, Link } from 'react-router-dom';
import { useAccount, useChainId } from 'wagmi';
import {
  ArrowLeft, Users, Clock, User, ExternalLink,
  Target, TrendingUp, Loader2, AlertTriangle, CheckCircle,
  Coins, GraduationCap, Unlock, Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChama, useJoinChama, useContribute, useRefund, useGraduate } from '../hooks/useChama';
import { ProgressBar } from '../components/ProgressBar';
import { formatAddress, formatAmount, formatDateTime, isExpired, getDaysRemaining, cn } from '../lib/utils';
import { getExplorerUrl } from '../config/contracts';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '../components/Toast';
import { useTokenAllowance } from '../hooks/useToken';
import { parseUnits } from 'viem';

/* ─── Animation helpers ────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── Sub-components ───────────────────────────────────────────────── */

/** Animated button — wraps any button-like element */
function AnimBtn({
  onClick,
  disabled,
  className,
  children,
  type = 'button',
}: {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled  ? {} : { scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  );
}

function ActionCard({
  title, icon, children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      layout
      className="glass-card p-6 border-sand/5"
    >
      <h3 className="font-semibold text-cream mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

function StatCard({ icon, label, value }: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -5,
        boxShadow: '0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(196,232,106,0.15) inset',
        backgroundColor: 'rgba(255,255,255,0.055)',
      }}
      transition={{ duration: 0.2 }}
      className="glass-card p-4 border-sand/5 cursor-default"
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-sand/50 font-medium">{label}</span>
      </div>
      <p className="text-xl font-bold text-cream">{value}</p>
    </motion.div>
  );
}

function DetailRow({ label, value, mono, last }: {
  label: string; value: string; mono?: boolean; last?: boolean;
}) {
  return (
    <div className={cn('flex justify-between items-center py-3', !last && 'border-b border-sand/10')}>
      <span className="text-sand/50 text-sm">{label}</span>
      <span className={cn('text-sm text-sand/80', mono && 'font-mono')}>{value}</span>
    </div>
  );
}

/** Skeleton shown while loading */
function DetailSkeleton() {
  return (
    <motion.div
      className="max-w-5xl mx-auto space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Shimmer skeleton cards */}
      <div className="skeleton h-4 w-32" />
      <div className="glass-card p-8">
        <div className="skeleton h-8 w-48 mb-4" />
        <div className="skeleton h-4 w-32 mb-8" />
        <div className="relative overflow-hidden skeleton h-20 w-full rounded-xl">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-4">
            <div className="skeleton h-4 w-16 mb-3" />
            <div className="skeleton h-6 w-20" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/** Animated member row */
function MemberRow({ member, creator, userAddress, index }: {
  member: string;
  creator: string | undefined;
  userAddress: string | undefined;
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 50);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const isCreatorMember = creator && member.toLowerCase() === creator.toLowerCase();
  const isYou = userAddress && member.toLowerCase() === userAddress.toLowerCase();

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-2 py-2.5 px-3 bg-white/[0.03] rounded-xl border border-sand/5',
        'hover:bg-white/[0.05] transition-all duration-200',
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      )}
      style={{ transition: 'opacity 0.4s ease, transform 0.4s ease' }}
    >
      <div className="w-7 h-7 rounded-lg bg-clay/30 flex items-center justify-center">
        <User className="w-3.5 h-3.5 text-sand/50" />
      </div>
      <span className="font-mono text-sm text-sand/70 flex-1">{formatAddress(member)}</span>
      {isCreatorMember && (
        <span className="badge-active text-[10px]">Creator</span>
      )}
      {isYou && (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-lime/15 text-mint border border-mint/20">
          You
        </span>
      )}
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────── */
export function ChamaDetail() {
  const { address } = useParams<{ address: string }>();
  const { address: userAddress } = useAccount();
  const chainId = useChainId();
  const [contributionAmount, setContributionAmount] = useState('');
  const { addToast } = useToast();

  const {
    chamaName, asset, targetCapital, minMembers, deadline, chamaToken,
    progress, graduated, memberCount, members, isMember, userContribution,
    creator, isLoading,
  } = useChama(address || null);

  const { join, isPending: isJoining }         = useJoinChama(address || null);
  const { contribute, isPending: isContributing } = useContribute(address || null);
  const { refund, isPending: isRefunding }       = useRefund(address || null);
  const { graduate, isPending: isGraduating }    = useGraduate(address || null);

  const { allowance, refetch: refetchAllowance, approve, isPending: isApproving } =
    useTokenAllowance(asset || null, userAddress, address);

  const expired      = isExpired(deadline);
  const daysLeft     = getDaysRemaining(deadline);
  const hasContributed = userContribution !== undefined && userContribution > BigInt(0);
  const pct          = Number(progress?.percentage || 0);
  const targetReached = pct >= 100;
  const isCreator    = creator && userAddress && creator.toLowerCase() === userAddress.toLowerCase();

  const needsApproval = (() => {
    if (!contributionAmount || !allowance) return false;
    try { return allowance < parseUnits(contributionAmount, 18); }
    catch { return false; }
  })();

  const handleContribute = async () => {
    if (!contributionAmount) return;
    addToast('Submitting contribution… Confirm in wallet', 'pending', 0);
    try {
      await contribute(contributionAmount, 18);
      addToast('Contribution successful! 🌱', 'success');
      setContributionAmount('');
      refetchAllowance();
    } catch { addToast('Contribution failed', 'error'); }
  };

  const handleApprove = async () => {
    if (!contributionAmount) return;
    addToast('Approving tokens… Confirm in wallet', 'pending', 0);
    try {
      await approve('1000000', 18);
      addToast('Approval successful! You can now contribute.', 'success');
      refetchAllowance();
    } catch { addToast('Approval failed', 'error'); }
  };

  const handleJoin = async () => {
    addToast('Joining Chama… Confirm in wallet', 'pending', 0);
    try {
      await join();
      addToast('Joined successfully! 🎉', 'success');
    } catch { addToast('Failed to join', 'error'); }
  };

  const handleRefund = async () => {
    addToast('Claiming refund… Confirm in wallet', 'pending', 0);
    try {
      await refund();
      addToast('Refund claimed! 💰', 'success');
    } catch { addToast('Refund failed', 'error'); }
  };

  const handleGraduate = async () => {
    addToast('Graduating Chama… Confirm in wallet', 'pending', 0);
    try {
      await graduate();
      addToast('Chama graduated! 🏆', 'success');
    } catch { addToast('Graduation failed', 'error'); }
  };

  if (isLoading) return <DetailSkeleton />;

  if (!address) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-12 text-center max-w-lg mx-auto"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-400/60" />
        </div>
        <h2 className="text-xl font-semibold text-cream mb-2">Chama Not Found</h2>
        <p className="text-sand/50 mb-6">This Chama doesn&apos;t exist or couldn&apos;t be loaded.</p>
        <Link to="/app/discover" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Discover
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto space-y-6"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Back link */}
      <motion.div variants={fadeUp}>
        <Link
          to="/app/discover"
          className="inline-flex items-center gap-2 text-sand/50 hover:text-sand transition-colors text-sm group"
        >
          <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.15 }} className="inline-flex">
            <ArrowLeft className="w-4 h-4" />
          </motion.span>
          Back to Discover
        </Link>
      </motion.div>

      {/* Header card */}
      <motion.div
        variants={fadeUp}
        whileHover={{ boxShadow: '0 16px 70px rgba(0,0,0,0.45), 0 0 80px rgba(122,191,66,0.07)', scale: 1.002 }}
        transition={{ duration: 0.25 }}
        className="glass-card p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-cream mb-2">
              {chamaName || `Chama #${address.slice(-6)}`}
            </h1>
            <p className="text-sm text-sand/40 font-mono">{formatAddress(address)}</p>
          </div>
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className={cn(
              graduated ? 'badge-graduated' : expired ? 'badge-expired' : 'badge-active',
              'self-start text-sm px-4 py-1.5'
            )}
          >
            {graduated ? '🏆 Graduated' : expired ? '⏰ Expired' : '🟢 Active'}
          </motion.span>
        </div>

        {/* Large progress visualization */}
        <div className="glass-card p-6 bg-white/[0.02] border-sand/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sand/60 text-sm font-medium">Savings Progress</span>
            <motion.span
              key={pct}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
              className={cn('text-2xl font-bold', pct >= 100 ? 'text-sun-gold' : 'text-lime')}
            >
              {pct.toFixed(1)}%
            </motion.span>
          </div>
          <ProgressBar
            current={progress?.current}
            target={progress?.target}
            percentage={progress?.percentage}
          />
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={stagger}
      >
        <StatCard icon={<Users className="w-5 h-5 text-clay" />} label="Members" value={memberCount ? memberCount.toString() : '0'} />
        <StatCard
          icon={<Clock className="w-5 h-5 text-sand" />}
          label={expired ? 'Status' : deadline ? 'Time Left' : 'Deadline'}
          value={expired ? 'Ended' : deadline ? `${daysLeft} days` : 'No deadline'}
        />
        <StatCard icon={<Target className="w-5 h-5 text-lime" />} label="Target" value={formatAmount(targetCapital, 18)} />
        <StatCard icon={<TrendingUp className="w-5 h-5 text-mint" />} label="Raised" value={formatAmount(progress?.current, 18)} />
      </motion.div>

      {/* Two-column layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Actions */}
        <motion.div className="space-y-6" variants={stagger}>

          {/* Join */}
          <AnimatePresence>
            {!isMember && !graduated && !expired && (
              <ActionCard key="join" title="Join Chama" icon={<Users className="w-5 h-5 text-lime" />}>
                <p className="text-sand/50 text-sm mb-4">
                  Join this savings group to start contributing towards the goal.
                </p>
                <AnimBtn
                  onClick={handleJoin}
                  disabled={isJoining}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isJoining ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Joining…</>
                  ) : 'Join Chama'}
                </AnimBtn>
              </ActionCard>
            )}
          </AnimatePresence>

          {/* Contribute */}
          <AnimatePresence>
            {isMember && !graduated && !expired && (
              <ActionCard key="contribute" title="Contribute" icon={<Coins className="w-5 h-5 text-lime" />}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-sand/60 mb-2">Amount</label>
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
                  {needsApproval ? (
                    <AnimBtn
                      onClick={handleApprove}
                      disabled={isApproving || !contributionAmount}
                      className="w-full btn-secondary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isApproving ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Approving…</>
                      ) : (
                        <><Unlock className="w-4 h-4" /> Approve Tokens</>
                      )}
                    </AnimBtn>
                  ) : (
                    <AnimBtn
                      onClick={handleContribute}
                      disabled={isContributing || !contributionAmount}
                      className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isContributing ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Confirming…</>
                      ) : 'Contribute'}
                    </AnimBtn>
                  )}
                  <AnimatePresence>
                    {needsApproval && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-sun-gold/80"
                      >
                        You need to approve tokens before contributing.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </ActionCard>
            )}
          </AnimatePresence>

          {/* Graduate */}
          <AnimatePresence>
            {isCreator && targetReached && !graduated && !expired && (
              <ActionCard key="graduate" title="Graduate Chama" icon={<GraduationCap className="w-5 h-5 text-sun-gold" />}>
                <p className="text-sand/50 text-sm mb-4">
                  Target reached! Graduate this Chama to mint tokens and distribute to members.
                </p>
                <AnimBtn
                  onClick={handleGraduate}
                  disabled={isGraduating}
                  className="w-full py-3 rounded-xl font-semibold bg-sun-gold/20 text-sun-gold border border-sun-gold/30 hover:bg-sun-gold/30 transition-all flex items-center justify-center gap-2"
                >
                  {isGraduating ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Graduating…</>
                  ) : (
                    <><GraduationCap className="w-4 h-4" /> Graduate Now</>
                  )}
                </AnimBtn>
              </ActionCard>
            )}
          </AnimatePresence>

          {/* Refund */}
          <AnimatePresence>
            {isMember && expired && !graduated && hasContributed && (
              <ActionCard key="refund" title="Claim Refund" icon={<AlertTriangle className="w-5 h-5 text-sun-gold" />}>
                <p className="text-sand/50 text-sm mb-4">
                  This Chama did not reach its target. You can claim your contribution back.
                </p>
                <AnimBtn
                  onClick={handleRefund}
                  disabled={isRefunding}
                  className="w-full py-3 rounded-xl font-semibold bg-sun-gold/20 text-sun-gold border border-sun-gold/30 hover:bg-sun-gold/30 transition-all flex items-center justify-center gap-2"
                >
                  {isRefunding ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                  ) : 'Claim Refund'}
                </AnimBtn>
              </ActionCard>
            )}
          </AnimatePresence>

          {/* Your contribution */}
          <AnimatePresence>
            {isMember && (
              <motion.div variants={fadeUp} className="glass-card p-6">
                <h3 className="font-semibold text-cream mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-lime" />
                  Your Contribution
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sand/50">Total Contributed</span>
                  <motion.span
                    key={userContribution?.toString()}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
                    className="text-2xl font-bold text-lime"
                  >
                    {formatAmount(userContribution, 18)}
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right: Details */}
        <motion.div className="space-y-6" variants={stagger}>
          {/* Chama info */}
          <motion.div variants={fadeUp} className="glass-card p-6">
            <h3 className="font-semibold text-cream mb-4">Chama Details</h3>
            <div className="space-y-0">
              <DetailRow label="Creator" value={formatAddress(creator)} mono />
              <DetailRow label="Asset"   value={formatAddress(asset)}   mono />
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
          </motion.div>

          {/* Members list */}
          <motion.div variants={fadeUp} className="glass-card p-6">
            <h3 className="font-semibold text-cream mb-4">
              Members ({memberCount ? memberCount.toString() : '0'})
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {members && members.length > 0 ? (
                members.map((member, i) => (
                  <MemberRow
                    key={member}
                    member={member}
                    creator={creator}
                    userAddress={userAddress}
                    index={i}
                  />
                ))
              ) : (
                <p className="text-sand/40 text-sm text-center py-4">No members yet</p>
              )}
            </div>
          </motion.div>

          {/* Explorer link */}
          <motion.div variants={fadeUp}>
            <motion.a
              href={getExplorerUrl(chainId, 'address', address)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              className="btn-secondary w-full flex items-center justify-center gap-2 py-3 text-sm"
            >
              View on Celo Explorer
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

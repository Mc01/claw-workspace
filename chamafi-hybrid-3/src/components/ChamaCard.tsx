import { Link } from 'react-router-dom';
import { Users, Clock, ArrowUpRight } from 'lucide-react';
import { useChama } from '../hooks/useChama';
import { ProgressBar } from './ProgressBar';
import { getDaysRemaining, isExpired, formatAddress, formatAmount, cn } from '../lib/utils';

interface ChamaCardProps {
  address: string;
}

export function ChamaCard({ address }: ChamaCardProps) {
  const { chamaName, deadline, progress, graduated, memberCount, isLoading } = useChama(address);

  if (isLoading) {
    return <ChamaCardSkeleton />;
  }

  const expired = isExpired(deadline);
  const daysLeft = getDaysRemaining(deadline);

  return (
    <Link
      to={`/app/chama/${address}`}
      className="glass-card-hover p-6 block group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg text-white truncate">
              {chamaName || `Chama #${address.slice(-6)}`}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-primary-400 transition-colors shrink-0" />
          </div>
          <p className="text-sm text-white/30 font-mono">
            {formatAddress(address)}
          </p>
        </div>
        <span className={cn(
          graduated ? "badge-graduated" : expired ? "badge-expired" : "badge-active"
        )}>
          {graduated ? 'Graduated' : expired ? 'Expired' : 'Active'}
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4 text-sm text-white/40 mb-4">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          <span>{memberCount?.toString() || '0'} members</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{expired ? 'Ended' : deadline ? `${daysLeft}d left` : 'No deadline'}</span>
        </div>
      </div>

      {/* Amount row */}
      <div className="flex items-center justify-between text-sm mb-3">
        <span className="text-white/40">Raised</span>
        <span className="text-white font-medium">
          {formatAmount(progress?.current, 18)} / {formatAmount(progress?.target, 18)}
        </span>
      </div>

      {/* Progress */}
      <ProgressBar
        current={progress?.current}
        target={progress?.target}
        percentage={progress?.percentage}
        compact
      />
    </Link>
  );
}

export function ChamaCardSkeleton() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="skeleton h-6 w-3/4 mb-2" />
          <div className="skeleton h-4 w-1/2" />
        </div>
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
      <div className="flex gap-4 mb-4">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-4 w-20" />
      </div>
      <div className="skeleton h-2 w-full rounded-full" />
    </div>
  );
}

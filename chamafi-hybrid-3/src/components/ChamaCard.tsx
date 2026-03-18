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
      className="relative block h-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 group transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_0_60px_rgba(34,197,94,0.05)]"
      style={{
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 4px 24px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(196, 232, 106, 0.06) 0%, rgba(122, 191, 66, 0.03) 50%, transparent 100%)',
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg text-cream truncate font-sans group-hover:text-mint transition-colors duration-300">
              {chamaName || `Chama #${address.slice(-6)}`}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-mint shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <p className="text-sm text-sand/50 font-mono group-hover:text-sand/70 transition-colors duration-300">
            {formatAddress(address)}
          </p>
        </div>
        <span
          className={cn(
            'px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300',
            graduated
              ? 'bg-sun-gold/20 text-sun-gold border-sun-gold/30 group-hover:bg-sun-gold/30 group-hover:border-sun-gold/50'
              : expired
              ? 'bg-red-500/20 text-red-400 border-red-500/30 group-hover:bg-red-500/30 group-hover:border-red-500/50'
              : 'bg-mint/20 text-mint border-mint/30 group-hover:bg-mint/30 group-hover:border-mint/50',
          )}
        >
          {graduated ? 'Graduated' : expired ? 'Expired' : 'Active'}
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4 text-sm text-sand/60 mb-4 group-hover:text-sand/80 transition-colors duration-300">
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
        <span className="text-sand/60 group-hover:text-sand/80 transition-colors duration-300">Raised</span>
        <span className="text-cream font-medium font-sans group-hover:text-mint transition-colors duration-300">
          {formatAmount(progress?.current, 18)} / {formatAmount(progress?.target, 18)}
        </span>
      </div>

      {/* Progress */}
      <div className="group-hover:scale-[1.02] transition-transform duration-300 origin-left">
        <ProgressBar
          current={progress?.current}
          target={progress?.target}
          percentage={progress?.percentage}
          compact
        />
      </div>
    </Link>
  );
}

export function ChamaCardSkeleton() {
  return (
    <div
      className="relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 overflow-hidden"
      style={{
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 4px 24px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Shimmer sweep */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-6 w-3/4 mb-2 bg-white/[0.06] rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-white/[0.06] rounded animate-pulse" />
        </div>
        <div className="h-6 w-16 bg-white/[0.06] rounded-full animate-pulse" />
      </div>
      <div className="flex gap-4 mb-4">
        <div className="h-4 w-24 bg-white/[0.06] rounded animate-pulse" />
        <div className="h-4 w-20 bg-white/[0.06] rounded animate-pulse" />
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="h-4 w-12 bg-white/[0.06] rounded animate-pulse" />
        <div className="h-4 w-28 bg-white/[0.06] rounded animate-pulse" />
      </div>
      <div className="h-2.5 w-full bg-white/[0.06] rounded-full animate-pulse" />
    </div>
  );
}

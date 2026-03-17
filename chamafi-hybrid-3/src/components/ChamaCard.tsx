import { Link } from 'react-router-dom';
import { Users, Clock, Target } from 'lucide-react';
import { useChama } from '../hooks/useChama';
import { ProgressBar } from './ProgressBar';
import { formatDate, getDaysRemaining, isExpired, formatAddress } from '../lib/utils';
import { cn } from '../lib/utils';

interface ChamaCardProps {
  address: string;
}

export function ChamaCard({ address }: ChamaCardProps) {
  const { params, progress, graduated, memberCount, isLoading } = useChama(address);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
        <div className="h-3 bg-gray-200 rounded w-full" />
      </div>
    );
  }

  const expired = isExpired(params?.deadline);
  const daysLeft = getDaysRemaining(params?.deadline);

  return (
    <Link
      to={`/chama/${address}`}
      className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-300 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            Chama #{address.slice(-6)}
          </h3>
          <p className="text-sm text-gray-500 font-mono">
            {formatAddress(address)}
          </p>
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium",
          graduated
            ? "bg-green-100 text-green-700"
            : expired
            ? "bg-red-100 text-red-700"
            : "bg-primary-100 text-primary-700"
        )}>
          {graduated ? 'Graduated' : expired ? 'Expired' : 'Active'}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{memberCount?.toString() || '0'} members</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{expired ? 'Ended' : `${daysLeft} days left`}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Target className="w-4 h-4" />
          <span>Deadline: {formatDate(params?.deadline)}</span>
        </div>

        <ProgressBar
          current={progress?.current}
          target={progress?.target}
          percentage={progress?.percentage}
        />
      </div>
    </Link>
  );
}

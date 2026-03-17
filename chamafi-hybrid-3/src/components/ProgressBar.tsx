import { cn } from '../lib/utils';

interface ProgressBarProps {
  current: bigint | undefined;
  target: bigint | undefined;
  percentage: bigint | undefined;
  className?: string;
  compact?: boolean;
}

export function ProgressBar({ current, target, percentage, className, compact }: ProgressBarProps) {
  const pct = Number(percentage || 0) / 100;
  const isComplete = pct >= 100;

  return (
    <div className={cn("w-full", className)}>
      {!compact && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/40">
            {current ? (Number(current) / 1e18).toFixed(2) : '0'} raised
          </span>
          <span className="text-white/40">
            {target ? (Number(target) / 1e18).toFixed(2) : '0'} target
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-700 rounded-full relative",
            isComplete
              ? "bg-gradient-to-r from-amber-500 to-amber-400"
              : "bg-gradient-to-r from-primary-600 to-primary-400"
          )}
          style={{ width: `${Math.min(pct, 100)}%` }}
        >
          {/* Shimmer effect on the progress bar */}
          {!isComplete && pct > 0 && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-1.5">
        <span className={cn(
          "text-xs font-semibold",
          isComplete ? "text-amber-400" : "text-primary-400"
        )}>
          {pct.toFixed(1)}%
        </span>
        {isComplete && (
          <span className="text-xs text-amber-400 font-medium">
            ✨ Target Reached
          </span>
        )}
      </div>
    </div>
  );
}

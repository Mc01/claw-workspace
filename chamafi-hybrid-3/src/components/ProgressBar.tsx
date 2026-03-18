import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface ProgressBarProps {
  current: bigint | undefined;
  target: bigint | undefined;
  /** Percentage 0–100 as returned by ChamaIncubation.getProgress() */
  percentage: bigint | undefined;
  className?: string;
  compact?: boolean;
}

export function ProgressBar({ current, target, percentage, className, compact }: ProgressBarProps) {
  // getProgress returns percentage 0–100 (not basis points)
  const pct = Number(percentage || 0);
  const isComplete = pct >= 100;

  return (
    <div className={cn("w-full", className)}>
      {!compact && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-sand/60">
            {current ? (Number(current) / 1e18).toFixed(2) : '0'} raised
          </span>
          <span className="text-sand/60">
            {target ? (Number(target) / 1e18).toFixed(2) : '0'} target
          </span>
        </div>
      )}
      <div className="w-full h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-700 rounded-full relative",
            isComplete
              ? "bg-gradient-to-r from-sun-gold to-ochre"
              : "bg-gradient-to-r from-forest via-leaf to-lime"
          )}
          style={{ width: `${Math.min(pct, 100)}%` }}
        >
          {/* Shimmer effect on the progress bar */}
          {!isComplete && pct > 0 && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className={cn(
          "text-xs font-semibold",
          isComplete ? "text-sun-gold" : "text-lime"
        )}>
          {pct.toFixed(1)}%
        </span>
        {isComplete && (
          <span className="text-xs text-sun-gold font-medium">
            ✨ Target Reached
          </span>
        )}
      </div>
    </div>
  );
}

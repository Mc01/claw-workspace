import { cn } from '../lib/utils';

interface ProgressBarProps {
  current: bigint | undefined;
  target: bigint | undefined;
  percentage: bigint | undefined;
  className?: string;
}

export function ProgressBar({ current, target, percentage, className }: ProgressBarProps) {
  const pct = Number(percentage || 0) / 100;
  const isComplete = pct >= 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">
          {current ? (Number(current) / 1e18).toFixed(2) : '0'} raised
        </span>
        <span className="text-gray-600">
          {target ? (Number(target) / 1e18).toFixed(2) : '0'} target
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-500 rounded-full",
            isComplete ? "bg-green-500" : "bg-primary-500"
          )}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <div className="text-right text-sm mt-1">
        <span className={cn(
          "font-medium",
          isComplete ? "text-green-600" : "text-primary-600"
        )}>
          {pct.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

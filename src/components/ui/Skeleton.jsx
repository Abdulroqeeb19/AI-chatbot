import { cn } from '../../lib/cn'

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg bg-neutral-800/50 animate-pulse',
        className
      )}
      {...props}
    />
  )
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn('rounded-xl border border-neutral-800/50 p-6 space-y-4', className)}>
      <Skeleton className="h-10 w-10 rounded-lg" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 4, className }) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className="flex gap-4">
          {Array.from({ length: cols }).map((_, col) => (
            <Skeleton key={col} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

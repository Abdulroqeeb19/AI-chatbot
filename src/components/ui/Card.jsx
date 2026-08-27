import { cn } from '../../lib/cn'

export default function Card({ className, hover = false, glow = false, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl bg-neutral-900/50 border border-neutral-800/50 p-6',
        'transition-all duration-300 ease-default',
        hover && 'hover:border-primary-500/30 hover:-translate-y-1 hover:shadow-lg',
        glow && 'hover:shadow-glow hover:border-primary-500/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('text-h4 font-bold text-neutral-100', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-body-sm text-neutral-400 mt-1', className)} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-neutral-800/50 flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  )
}

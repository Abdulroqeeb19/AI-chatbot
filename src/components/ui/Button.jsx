import { cn } from '../../lib/cn'

const variants = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5',
  secondary: 'bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600',
  ghost: 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50',
  danger: 'bg-critical-500/10 text-critical-500 border border-critical-500/20 hover:bg-critical-500/20',
  success: 'bg-gradient-to-r from-success-500 to-success-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_36px_rgba(34,197,94,0.5)]',
  outline: 'border border-primary-500/30 text-primary-400 hover:bg-primary-500/10 hover:border-primary-500/50',
  link: 'text-primary-400 hover:text-primary-300 underline-offset-4 hover:underline',
}

const sizes = {
  xs: 'h-7 px-2.5 text-caption rounded-sm',
  sm: 'h-8 px-3 text-body-sm rounded-md',
  md: 'h-10 px-4 text-body-sm rounded-lg',
  lg: 'h-11 px-6 text-body rounded-lg',
  xl: 'h-12 px-8 text-body-lg rounded-xl',
  icon: 'h-10 w-10 rounded-lg',
  'icon-sm': 'h-8 w-8 rounded-md',
  'icon-lg': 'h-12 w-12 rounded-xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-default',
        'focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

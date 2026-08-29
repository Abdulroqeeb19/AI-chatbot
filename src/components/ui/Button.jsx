import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { tapScale } from '../../lib/motion'

const variants = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow',
  secondary: 'bg-neutral-800 text-neutral-100 border border-neutral-700',
  ghost: 'text-neutral-400',
  danger: 'bg-critical-500/10 text-critical-500 border border-critical-500/20',
  success: 'bg-gradient-to-r from-success-500 to-success-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]',
  outline: 'border border-primary-500/30 text-primary-400',
  link: 'text-primary-400 underline-offset-4',
}

const hoverEffects = {
  primary: { scale: 1.02, boxShadow: '0 0 40px rgba(99, 102, 241, 0.5)', y: -2 },
  secondary: { scale: 1.01, backgroundColor: 'rgba(30, 41, 59, 1)', borderColor: 'rgba(75, 85, 99, 1)' },
  ghost: { backgroundColor: 'rgba(30, 41, 59, 0.5)', color: '#f1f5f9' },
  danger: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
  success: { scale: 1.02, boxShadow: '0 0 36px rgba(34, 197, 94, 0.5)', y: -2 },
  outline: { backgroundColor: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.5)' },
  link: { color: '#a5b4fc', textDecoration: 'underline' },
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
    <motion.button
      whileHover={disabled ? {} : hoverEffects[variant]}
      whileTap={disabled ? {} : tapScale}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200',
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
    </motion.button>
  )
}

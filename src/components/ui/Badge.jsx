import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { scaleIn } from '../../lib/motion'

const variants = {
  default: 'bg-neutral-800/50 text-neutral-300 border-neutral-700/50',
  primary: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
  success: 'bg-success-500/10 text-success-500 border-success-500/20',
  warning: 'bg-warning-500/10 text-warning-500 border-warning-500/20',
  danger: 'bg-critical-500/10 text-critical-500 border-critical-500/20',
  secondary: 'bg-secondary-500/10 text-secondary-400 border-secondary-500/20',
}

const sizes = {
  sm: 'px-2 py-0.5 text-micro',
  md: 'px-2.5 py-1 text-caption',
  lg: 'px-3 py-1 text-body-sm',
}

export default function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <motion.span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'success' && 'bg-success-500',
            variant === 'warning' && 'bg-warning-500',
            variant === 'danger' && 'bg-critical-500',
            variant === 'primary' && 'bg-primary-400',
            variant === 'secondary' && 'bg-secondary-400',
            variant === 'default' && 'bg-neutral-400',
          )}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {children}
    </motion.span>
  )
}

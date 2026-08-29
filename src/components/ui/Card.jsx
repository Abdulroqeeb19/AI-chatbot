import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { hoverLift, hoverGlow, springGentle } from '../../lib/motion'

export default function Card({ className, hover = false, glow = false, children, ...props }) {
  return (
    <motion.div
      whileHover={
        hover
          ? glow
            ? { y: -4, boxShadow: '0 0 32px rgba(99, 102, 241, 0.3)', borderColor: 'rgba(99, 102, 241, 0.3)', transition: springGentle }
            : { y: -4, borderColor: 'rgba(99, 102, 241, 0.3)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)', transition: springGentle }
          : {}
      }
      className={cn(
        'rounded-xl bg-neutral-900/50 border border-neutral-800/50 p-6',
        'transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
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

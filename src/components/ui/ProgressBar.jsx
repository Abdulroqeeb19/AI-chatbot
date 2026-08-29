import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/cn'

const colorMap = {
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-critical-500',
}

export default function ProgressBar({ value = 0, max = 100, color = 'primary', label, showValue = false, className }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className={cn('space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-caption font-medium text-neutral-300">{label}</span>}
          {showValue && <span className="text-caption text-neutral-500">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="h-2 rounded-full bg-neutral-800/50 overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', colorMap[color])}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${percentage}%` } : { width: '0%' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>
    </div>
  )
}

export function ScoreRing({ value = 0, size = 80, strokeWidth = 6, color = 'primary', label, className }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const colorClass = {
    primary: 'text-primary-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
    danger: 'text-critical-500',
  }[color]

  return (
    <div ref={ref} className={cn('inline-flex flex-col items-center gap-1', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-neutral-800/50"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={colorClass}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            strokeDasharray={circumference}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className={cn('text-h4 font-bold', colorClass)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {value}
          </motion.span>
        </div>
      </div>
      {label && <span className="text-caption text-neutral-400">{label}</span>}
    </div>
  )
}

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

export default function Switch({ label, description, className, ...props }) {
  return (
    <div className="flex items-center justify-between gap-4">
      {(label || description) && (
        <div className="space-y-0.5">
          {label && <div className="text-body-sm font-medium text-neutral-200">{label}</div>}
          {description && <div className="text-caption text-neutral-500">{description}</div>}
        </div>
      )}
      <SwitchPrimitive.Root
        className={cn(
          'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full',
          'border-2 border-transparent transition-colors duration-200',
          'focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-neutral-700',
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb asChild>
          <motion.span
            className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg"
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    </div>
  )
}

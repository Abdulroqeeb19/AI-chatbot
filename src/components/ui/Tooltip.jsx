import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'

export default function Tooltip({ children, content, side = 'top', className }) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            asChild
          >
            <motion.div
              initial={{ opacity: 0, y: side === 'top' ? 4 : side === 'bottom' ? -4 : 0, x: side === 'left' ? 4 : side === 'right' ? -4 : 0, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.1 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={cn(
                'z-50 px-3 py-1.5 rounded-lg text-caption font-medium',
                'bg-neutral-800 text-neutral-200 border border-neutral-700/50 shadow-lg',
                className
              )}
            >
              {content}
              <TooltipPrimitive.Arrow className="fill-neutral-800" />
            </motion.div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

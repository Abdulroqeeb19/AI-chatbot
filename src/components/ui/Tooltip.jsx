import * as TooltipPrimitive from '@radix-ui/react-tooltip'
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
            className={cn(
              'z-50 px-3 py-1.5 rounded-lg text-caption font-medium',
              'bg-neutral-800 text-neutral-200 border border-neutral-700/50 shadow-lg',
              'animate-fade-in',
              className
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-neutral-800" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

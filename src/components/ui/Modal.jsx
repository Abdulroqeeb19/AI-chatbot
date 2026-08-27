import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../lib/cn'

export default function Modal({ open, onOpenChange, title, description, children, className }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            'w-full max-w-lg p-6 rounded-2xl',
            'bg-neutral-900 border border-neutral-800/50 shadow-2xl',
            'animate-fade-in',
            className
          )}
        >
          {(title || description) && (
            <div className="mb-4">
              {title && (
                <Dialog.Title className="text-h4 font-bold text-neutral-100">
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description className="text-body-sm text-neutral-400 mt-1">
                  {description}
                </Dialog.Description>
              )}
            </div>
          )}
          {children}
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

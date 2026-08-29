import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { overlayFade, modalSlideUp } from '../../lib/motion'

export default function Modal({ open, onOpenChange, title, description, children, className }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={overlayFade}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalSlideUp}
                className={cn(
                  'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
                  'w-full max-w-lg p-6 rounded-2xl',
                  'bg-neutral-900 border border-neutral-800/50 shadow-2xl',
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
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

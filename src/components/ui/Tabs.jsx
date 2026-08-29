import { useState, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'
import { fadeUp, tweenFast } from '../../lib/motion'

const TabsContext = createContext()

export function Tabs({ defaultValue, value, onValueChange, children, className, ...props }) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue
  const setValue = onValueChange || setInternalValue

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div className={cn('', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-xl bg-neutral-900/50 border border-neutral-800/50',
        className
      )}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({ value, className, children, ...props }) {
  const ctx = useContext(TabsContext)
  const isActive = ctx.value === value

  return (
    <button
      role="tab"
      aria-selected={isActive}
      className={cn(
        'relative px-4 py-2 text-body-sm font-medium rounded-lg transition-colors duration-200',
        isActive ? 'text-primary-400' : 'text-neutral-400 hover:text-neutral-200',
        className
      )}
      onClick={() => ctx.setValue(value)}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId="tab-active-bg"
          className="absolute inset-0 bg-primary-500/15 rounded-lg shadow-sm"
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export function TabsContent({ value, className, children, ...props }) {
  const ctx = useContext(TabsContext)

  return (
    <AnimatePresence mode="wait">
      {ctx.value === value && (
        <motion.div
          key={value}
          role="tabpanel"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeUp}
          className={cn('mt-4', className)}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

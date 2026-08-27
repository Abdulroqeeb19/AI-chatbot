import { useState, createContext, useContext } from 'react'
import { cn } from '../../lib/cn'

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
        'px-4 py-2 text-body-sm font-medium rounded-lg transition-all duration-200',
        isActive
          ? 'bg-primary-500/15 text-primary-400 shadow-sm'
          : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50',
        className
      )}
      onClick={() => ctx.setValue(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className, children, ...props }) {
  const ctx = useContext(TabsContext)
  if (ctx.value !== value) return null

  return (
    <div
      role="tabpanel"
      className={cn('mt-4 animate-fade-in', className)}
      {...props}
    >
      {children}
    </div>
  )
}

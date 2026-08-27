import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/cn'
import { ChevronDown, Check } from 'lucide-react'

export default function Select({
  label,
  value,
  onValueChange,
  options = [],
  placeholder = 'Select...',
  className,
  containerClassName,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selected = options.find(o => o.value === value)

  return (
    <div className={cn('space-y-1.5', containerClassName)}>
      {label && (
        <label className="block text-caption font-semibold text-neutral-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div ref={ref} className="relative">
        <button
          type="button"
          className={cn(
            'w-full h-10 px-3.5 text-body-sm rounded-lg text-left',
            'bg-neutral-900/50 border border-neutral-700/50 text-neutral-100',
            'transition-all duration-200',
            'focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30',
            isOpen && 'border-primary-500 ring-1 ring-primary-500/30',
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected ? selected.label : <span className="text-neutral-500">{placeholder}</span>}
          <ChevronDown className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-transform',
            isOpen && 'rotate-180'
          )} />
        </button>

        {isOpen && (
          <div className={cn(
            'absolute z-50 w-full mt-1 py-1 rounded-lg',
            'bg-neutral-900 border border-neutral-700/50 shadow-xl',
            'animate-fade-in'
          )}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'w-full px-3.5 py-2 text-body-sm text-left flex items-center gap-2',
                  'transition-colors duration-100',
                  value === option.value
                    ? 'text-primary-400 bg-primary-500/10'
                    : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-neutral-100'
                )}
                onClick={() => {
                  onValueChange(option.value)
                  setIsOpen(false)
                }}
              >
                {value === option.value && <Check className="w-4 h-4 text-primary-400" />}
                <span className={value === option.value ? '' : 'ml-6'}>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

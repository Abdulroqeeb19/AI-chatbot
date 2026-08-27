import { useState } from 'react'
import { cn } from '../../lib/cn'

const PRESET_COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#ef4444', '#f97316',
  '#f59e0b', '#eab308', '#84cc16', '#22c55e',
  '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6',
]

export default function ColorPicker({ value, onChange, label, className }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className="block text-caption font-semibold text-neutral-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative w-10 h-10 rounded-lg border-2 border-neutral-700 overflow-hidden transition-all hover:border-neutral-500 focus:outline-none focus:border-primary-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="absolute inset-0" style={{ background: value }} />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 h-10 px-3 text-body-sm rounded-lg bg-neutral-900/50 border border-neutral-700/50 text-neutral-300 font-mono focus:outline-none focus:border-primary-500"
        />
      </div>

      {isOpen && (
        <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-700/50 shadow-xl animate-fade-in">
          <div className="grid grid-cols-8 gap-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className={cn(
                  'w-8 h-8 rounded-lg transition-all duration-150 hover:scale-110',
                  value === color && 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900'
                )}
                style={{ background: color }}
                onClick={() => {
                  onChange(color)
                  setIsOpen(false)
                }}
              />
            ))}
          </div>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-3 w-full h-8 rounded cursor-pointer"
          />
        </div>
      )}
    </div>
  )
}

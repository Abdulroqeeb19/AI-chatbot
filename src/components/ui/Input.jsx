import { cn } from '../../lib/cn'

export default function Input({
  label,
  error,
  helperText,
  className,
  containerClassName,
  ...props
}) {
  return (
    <div className={cn('space-y-1.5', containerClassName)}>
      {label && (
        <label className="block text-caption font-semibold text-neutral-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full h-10 px-3.5 text-body-sm rounded-lg',
          'bg-neutral-900/50 border border-neutral-700/50 text-neutral-100',
          'placeholder:text-neutral-500',
          'transition-all duration-200',
          'focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30',
          error && 'border-critical-500/50 focus:border-critical-500 focus:ring-critical-500/30',
          className
        )}
        {...props}
      />
      {(error || helperText) && (
        <p className={cn('text-caption', error ? 'text-critical-500' : 'text-neutral-500')}>
          {error || helperText}
        </p>
      )}
    </div>
  )
}

export function Textarea({ label, error, className, containerClassName, ...props }) {
  return (
    <div className={cn('space-y-1.5', containerClassName)}>
      {label && (
        <label className="block text-caption font-semibold text-neutral-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full min-h-[100px] px-3.5 py-2.5 text-body-sm rounded-lg resize-y',
          'bg-neutral-900/50 border border-neutral-700/50 text-neutral-100',
          'placeholder:text-neutral-500',
          'transition-all duration-200',
          'focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30',
          error && 'border-critical-500/50 focus:border-critical-500 focus:ring-critical-500/30',
          className
        )}
        {...props}
      />
      {error && <p className="text-caption text-critical-500">{error}</p>}
    </div>
  )
}

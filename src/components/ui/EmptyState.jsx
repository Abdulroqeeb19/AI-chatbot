import { cn } from '../../lib/cn'
import Button from './Button'

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-neutral-500" />
        </div>
      )}
      <h3 className="text-h4 font-bold text-neutral-200 mb-2">{title}</h3>
      <p className="text-body-sm text-neutral-400 max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant={action.variant || 'primary'}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

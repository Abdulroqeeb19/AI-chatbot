import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

const sizes = {
  xs: 'w-6 h-6 text-micro',
  sm: 'w-8 h-8 text-caption',
  md: 'w-10 h-10 text-body-sm',
  lg: 'w-12 h-12 text-body',
  xl: 'w-16 h-16 text-h4',
}

export default function Avatar({ src, alt, name, size = 'md', className, ...props }) {
  const initials = name
    ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden',
        'bg-gradient-to-br from-primary-500 to-secondary-500 font-bold text-white',
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt || name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </motion.div>
  )
}

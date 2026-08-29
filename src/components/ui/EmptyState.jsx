import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import Button from './Button'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={cn('flex flex-col items-center justify-center py-16 text-center', className)}
    >
      {Icon && (
        <motion.div
          variants={staggerItem}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="w-16 h-16 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center mb-4"
        >
          <Icon className="w-8 h-8 text-neutral-500" />
        </motion.div>
      )}
      <motion.h3 variants={staggerItem} className="text-h4 font-bold text-neutral-200 mb-2">{title}</motion.h3>
      <motion.p variants={staggerItem} className="text-body-sm text-neutral-400 max-w-sm mb-6">{description}</motion.p>
      {action && (
        <motion.div variants={staggerItem}>
          <Button onClick={action.onClick} variant={action.variant || 'primary'}>
            {action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

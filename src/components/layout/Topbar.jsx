import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'
import { Bell, Search, PanelLeftClose, PanelLeft } from 'lucide-react'

export default function Topbar({ title, subtitle, saving, collapsed, onToggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'h-16 flex items-center justify-between px-6',
        'border-b border-neutral-800/50 bg-neutral-950/50 backdrop-blur-sm',
        'sticky top-0 z-30'
      )}
    >
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 transition-colors lg:hidden"
        >
          {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </motion.button>

        <div>
          <h1 className="text-body-lg font-bold text-neutral-100">{title}</h1>
          {subtitle && <p className="text-caption text-neutral-500">{subtitle}</p>}
        </div>

        <AnimatePresence>
          {saving && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -10 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary-400"
              />
              <span className="text-caption font-medium text-primary-400">Saving...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <motion.input
            whileFocus={{ width: 280, borderColor: 'rgba(99, 102, 241, 0.5)' }}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-9 pl-9 pr-4 text-body-sm rounded-lg bg-neutral-900/50 border border-neutral-800/50 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-primary-500/50 transition-all duration-200"
          />
        </div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 transition-colors"
        >
          <Bell size={18} />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500"
          />
        </motion.button>
      </div>
    </motion.header>
  )
}

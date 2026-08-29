import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'
import { staggerContainer, staggerItem, springGentle, tweenFast } from '../../lib/motion'
import {
  LayoutDashboard, Palette, Search, GitBranch, PenTool,
  Settings, ChevronLeft, ChevronRight, LogOut, MessageSquare,
  ChevronDown
} from 'lucide-react'

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Design',
    items: [
      { id: 'ui-generator', label: 'UI Generator', icon: MessageSquare },
      { id: 'design-system', label: 'Design System', icon: Palette },
    ],
  },
  {
    label: 'Tools',
    items: [
      { id: 'seo-audit', label: 'SEO Audit', icon: Search },
      { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
      { id: 'figma', label: 'Figma Hub', icon: PenTool },
    ],
  },
]

export default function Sidebar({ active, onNavigate, businessName, collapsed, onToggleCollapse }) {
  const [expandedSections, setExpandedSections] = useState(
    NAV_SECTIONS.reduce((acc, s) => ({ ...acc, [s.label]: true }), {})
  )

  const toggleSection = (label) => {
    setExpandedSections(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 260 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'fixed top-0 bottom-0 left-0 z-40',
        'bg-neutral-950/80 backdrop-blur-xl border-r border-neutral-800/50',
        'flex flex-col'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'h-16 flex items-center border-b border-neutral-800/50',
        collapsed ? 'justify-center px-2' : 'px-5 gap-3'
      )}>
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shrink-0"
        >
          <span className="text-white text-caption font-bold">CB</span>
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={tweenFast}
              className="overflow-hidden"
            >
              <div className="text-body-sm font-bold text-neutral-100 whitespace-nowrap">ChatBot Pro</div>
              <div className="text-micro text-neutral-500 whitespace-nowrap">{businessName || 'My Workspace'}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_SECTIONS.map((section, si) => (
          <div key={section.label} className="mb-2">
            <AnimatePresence>
              {!collapsed && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => toggleSection(section.label)}
                  className="flex items-center justify-between w-full px-3 py-1.5 text-micro font-semibold text-neutral-500 uppercase tracking-widest hover:text-neutral-400 transition-colors"
                >
                  {section.label}
                  <motion.div
                    animate={{ rotate: expandedSections[section.label] ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3 h-3" />
                  </motion.div>
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(expandedSections[section.label] || collapsed) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-0.5 overflow-hidden"
                >
                  {section.items.map((item, ii) => {
                    const Icon = item.icon
                    const isActive = active === item.id
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: ii * 0.04 }}
                        whileHover={{ x: collapsed ? 0 : 4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onNavigate(item.id)}
                        className={cn(
                          'w-full flex items-center gap-3 rounded-lg transition-colors duration-150 relative',
                          collapsed ? 'justify-center p-2.5' : 'px-3 py-2.5',
                          isActive
                            ? 'text-primary-400'
                            : 'text-neutral-400 hover:text-neutral-200'
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 bg-primary-500/10 rounded-lg"
                            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                          />
                        )}
                        <Icon className={cn('shrink-0 relative z-10', isActive ? 'text-primary-400' : 'text-neutral-500')} size={18} />
                        {!collapsed && (
                          <span className="text-body-sm font-medium truncate relative z-10">{item.label}</span>
                        )}
                        {isActive && !collapsed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400 relative z-10"
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Collapse toggle & Sign out */}
      <div className="border-t border-neutral-800/50 p-2 space-y-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50 transition-colors"
        >
          <motion.div
            animate={{ rotate: collapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft size={16} />
          </motion.div>
          {!collapsed && <span className="text-body-sm">Collapse</span>}
        </motion.button>
        <AnimatePresence>
          {!collapsed && (
            <motion.button
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              whileHover={{ x: 4 }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-500 hover:text-critical-400 hover:bg-critical-500/10 transition-colors overflow-hidden"
            >
              <LogOut size={18} />
              <span className="text-body-sm font-medium">Sign Out</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  )
}

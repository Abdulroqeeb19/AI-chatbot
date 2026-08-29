import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { pageTransition } from '../../lib/motion'

const PAGE_META = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of your workspace' },
  'ui-generator': { title: 'UI Generator', subtitle: 'Create interfaces with AI assistance' },
  'design-system': { title: 'Design System', subtitle: 'Manage your design tokens and presets' },
  'seo-audit': { title: 'SEO Audit', subtitle: 'Analyze and optimize your pages' },
  pipeline: { title: 'Pipeline', subtitle: 'Visual workflow orchestration' },
  figma: { title: 'Figma Hub', subtitle: 'Sync and manage design assets' },
  settings: { title: 'Settings', subtitle: 'Manage your account and preferences' },
}

export default function AdminLayout({ activePage, onNavigate, businessName, children }) {
  const [collapsed, setCollapsed] = useState(false)
  const meta = PAGE_META[activePage] || { title: 'Dashboard', subtitle: '' }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Background gradient orbs with subtle animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-500/5 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary-500/5 blur-[120px]"
        />
      </div>

      <Sidebar
        active={activePage}
        onNavigate={onNavigate}
        businessName={businessName}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <motion.div
        animate={{ marginLeft: collapsed ? 68 : 260 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative"
      >
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed(!collapsed)}
        />

        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
    </div>
  )
}

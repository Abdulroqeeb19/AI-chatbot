import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

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
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-500/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary-500/5 blur-[120px]" />
      </div>

      <Sidebar
        active={activePage}
        onNavigate={onNavigate}
        businessName={businessName}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <div className={`transition-all duration-300 ${collapsed ? 'ml-[68px]' : 'ml-[260px]'}`}>
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed(!collapsed)}
        />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

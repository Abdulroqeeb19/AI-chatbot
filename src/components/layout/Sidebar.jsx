import { useState } from 'react'
import { cn } from '../../lib/cn'
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
    <aside className={cn(
      'fixed top-0 bottom-0 left-0 z-40',
      'bg-neutral-950/80 backdrop-blur-xl border-r border-neutral-800/50',
      'flex flex-col transition-all duration-300 ease-default',
      collapsed ? 'w-[68px]' : 'w-[260px]'
    )}>
      {/* Logo */}
      <div className={cn(
        'h-16 flex items-center border-b border-neutral-800/50',
        collapsed ? 'justify-center px-2' : 'px-5 gap-3'
      )}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shrink-0">
          <span className="text-white text-caption font-bold">CB</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-body-sm font-bold text-neutral-100 truncate">ChatBot Pro</div>
            <div className="text-micro text-neutral-500 truncate">{businessName || 'My Workspace'}</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-2">
            {!collapsed && (
              <button
                onClick={() => toggleSection(section.label)}
                className="flex items-center justify-between w-full px-3 py-1.5 text-micro font-semibold text-neutral-500 uppercase tracking-widest hover:text-neutral-400 transition-colors"
              >
                {section.label}
                <ChevronDown className={cn(
                  'w-3 h-3 transition-transform',
                  !expandedSections[section.label] && '-rotate-90'
                )} />
              </button>
            )}

            {(expandedSections[section.label] || collapsed) && (
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = active === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={cn(
                        'w-full flex items-center gap-3 rounded-lg transition-all duration-200',
                        collapsed ? 'justify-center p-2.5' : 'px-3 py-2.5',
                        isActive
                          ? 'bg-primary-500/10 text-primary-400'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className={cn('shrink-0', isActive ? 'text-primary-400' : 'text-neutral-500')} size={18} />
                      {!collapsed && (
                        <span className="text-body-sm font-medium truncate">{item.label}</span>
                      )}
                      {isActive && !collapsed && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Collapse toggle & Sign out */}
      <div className="border-t border-neutral-800/50 p-2 space-y-1">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-body-sm">Collapse</span>}
        </button>
        {!collapsed && (
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-500 hover:text-critical-400 hover:bg-critical-500/10 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-body-sm font-medium">Sign Out</span>
          </button>
        )}
      </div>
    </aside>
  )
}

import { cn } from '../../lib/cn'
import { Bell, Search, Moon, Sun, PanelLeftClose, PanelLeft } from 'lucide-react'
import { useState } from 'react'

export default function Topbar({ title, subtitle, saving, collapsed, onToggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className={cn(
      'h-16 flex items-center justify-between px-6',
      'border-b border-neutral-800/50 bg-neutral-950/50 backdrop-blur-sm',
      'sticky top-0 z-30'
    )}>
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 transition-colors lg:hidden"
        >
          {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </button>

        <div>
          <h1 className="text-body-lg font-bold text-neutral-100">{title}</h1>
          {subtitle && <p className="text-caption text-neutral-500">{subtitle}</p>}
        </div>

        {saving && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20">
            <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-caption font-medium text-primary-400">Saving...</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-9 pl-9 pr-4 text-body-sm rounded-lg bg-neutral-900/50 border border-neutral-800/50 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-primary-500/50 transition-colors"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 transition-colors">
          <Bell size={18} />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500" />
        </button>
      </div>
    </header>
  )
}

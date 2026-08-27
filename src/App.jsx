import { useState, useEffect } from 'react'
import Landing from './pages/Landing'
import Admin from './pages/Admin'
import BusinessPage from './pages/BusinessPage'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './pages/features/Dashboard'
import UiGenerator from './pages/features/UiGenerator'
import DesignSystem from './pages/features/DesignSystem'
import SeoAudit from './pages/features/SeoAudit'
import Pipeline from './pages/features/Pipeline'
import FigmaHub from './pages/features/FigmaHub'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

function NewAdmin() {
  const [activePage, setActivePage] = useState('dashboard')

  const handleNavigate = (page) => {
    setActivePage(page)
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />
      case 'ui-generator': return <UiGenerator />
      case 'design-system': return <DesignSystem />
      case 'seo-audit': return <SeoAudit />
      case 'pipeline': return <Pipeline />
      case 'figma': return <FigmaHub />
      default: return <Dashboard />
    }
  }

  return (
    <AdminLayout
      activePage={activePage}
      onNavigate={handleNavigate}
      businessName="My Workspace"
    >
      {renderPage()}
    </AdminLayout>
  )
}

export default function App() {
  const hash = useHashRoute()
  const path = window.location.pathname

  if (path.startsWith('/b/')) {
    const slug = path.split('/b/')[1]?.split('?')[0]
    return <BusinessPage slug={slug} />
  }

  if (hash.startsWith('#/admin')) return <NewAdmin />
  if (hash.startsWith('#/legacy')) return <Admin />

  return <Landing />
}

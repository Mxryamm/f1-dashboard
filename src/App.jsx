import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Standings from './pages/Standings'
import Analytics from './pages/Analytics'
import Predictions from './pages/Predictions'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastProvider } from './contexts/ToastContext'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'standings':
        return <Standings />
      case 'analytics':
        return <Analytics />
      case 'predictions':
        return <Predictions />
      case 'dashboard':
      default:
        return <Dashboard />
    }
  }

  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="min-h-screen bg-f1-bg f1-bg-pattern">
          <Header onPageChange={setCurrentPage} currentPage={currentPage} />
          <main className="flex-1">
            {renderPage()}
          </main>
        </div>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App 
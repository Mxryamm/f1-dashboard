import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Standings from './pages/Standings'
import Analytics from './pages/Analytics'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'standings':
        return <Standings />
      case 'analytics':
        return <Analytics />
      case 'dashboard':
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-f1-bg f1-bg-pattern">
      <Header onPageChange={setCurrentPage} currentPage={currentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
    </div>
  )
}

export default App 
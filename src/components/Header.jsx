import { useState } from 'react'

const Header = ({ onPageChange, currentPage }) => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // You can add theme switching logic here
  }

  const handlePageChange = (page) => {
    onPageChange(page)
  }

  return (
    <header className="flex items-center justify-between px-8 lg:px-16 py-6 bg-f1-bg/60 backdrop-blur border-b border-f1-card/60">
      <h1 
        onClick={() => handlePageChange('dashboard')}
        className="text-2xl lg:text-3xl font-semibold tracking-tight flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className="inline-flex items-center justify-center bg-f1-accent w-9 h-9 rounded-md text-white text-xl font-semibold">🏁</span>
        <span>BoxBoxBox</span>
      </h1>

      <nav className="hidden md:flex items-center gap-10 text-sm lg:text-base text-f1-text-secondary">
        <button 
          onClick={() => handlePageChange('dashboard')}
          className={`hover:text-white transition ${currentPage === 'dashboard' ? 'text-white font-semibold' : ''}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => handlePageChange('standings')}
          className={`hover:text-white transition ${currentPage === 'standings' ? 'text-white font-semibold' : ''}`}
        >
          Standings
        </button>
        <button className="hover:text-white transition">Analytics</button>
        <button className="hover:text-white transition">Predictions</button>
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-f1-card/50 border border-white/10 hover:bg-f1-card hover:border-white/20 transition-all duration-200"
      >
        {isDarkMode ? (
          <svg className="w-5 h-5 text-f1-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-f1-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </header>
  )
}

export default Header 
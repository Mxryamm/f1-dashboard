import { useState } from 'react'

const Header = ({ onPageChange, currentPage }) => {
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
        <button 
          onClick={() => handlePageChange('analytics')}
          className={`hover:text-white transition ${currentPage === 'analytics' ? 'text-white font-semibold' : ''}`}
        >
          Analytics
        </button>
        <button className="hover:text-white transition">Predictions</button>
      </nav>
    </header>
  )
}

export default Header 
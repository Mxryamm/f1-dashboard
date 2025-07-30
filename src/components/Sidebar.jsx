const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z', active: true },
    { name: 'Standings', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Predictions', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { name: 'Drivers', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Teams', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Races', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ]

  return (
    <aside className={`fixed left-0 top-20 h-full glass border-r border-white/10 transition-all duration-300 z-40 ${isOpen ? 'w-72' : 'w-0 overflow-hidden'}`}>
      <nav className="p-6">
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-200 ${
                  item.active 
                    ? 'bg-gradient-to-r from-f1-accent/20 to-f1-accent/10 text-f1-accent border border-f1-accent/30 shadow-lg' 
                    : 'text-f1-text-secondary hover:bg-white/5 hover:text-f1-text'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="font-semibold text-body">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Live Stats Section */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="premium-card p-6">
          <h3 className="text-h3 font-bold text-f1-text mb-4 flex items-center">
            <span className="w-3 h-3 bg-live-green rounded-full mr-3 animate-pulse-slow"></span>
            Live Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-caption text-f1-text-secondary">Leader</span>
              <div className="text-right">
                <div className="text-body font-semibold text-f1-text">Max Verstappen</div>
                <div className="text-caption text-f1-accent">+51 pts</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-caption text-f1-text-secondary">Next Race</span>
              <div className="text-right">
                <div className="text-body font-semibold text-f1-text">Monaco GP</div>
                <div className="text-caption text-live-green">May 26</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-caption text-f1-text-secondary">Last Winner</span>
              <div className="text-right">
                <div className="text-body font-semibold text-f1-text">Lando Norris</div>
                <div className="text-caption text-mclaren-orange">Miami GP</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-4 space-y-3">
          <button className="w-full btn-secondary text-body py-3">
            <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Widget
          </button>
          <button className="w-full btn-secondary text-body py-3">
            <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar 
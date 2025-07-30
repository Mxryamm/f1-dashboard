import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)

  // Quick Look Tiles Data
  const quickLookTiles = [
    { 
      title: 'Next Race', 
      value: 'Monaco GP', 
      subtitle: 'May 26, 2024',
      icon: '🏁',
      color: 'text-live-green'
    },
    { 
      title: 'Current Leader', 
      value: 'Max Verstappen', 
      subtitle: '575 points',
      icon: '👑',
      color: 'text-f1-accent'
    },
    { 
      title: 'Constructor Standings', 
      value: 'Red Bull', 
      subtitle: '860 points',
      icon: '🏆',
      color: 'text-redbull-blue'
    },
  ]

  // Driver Stats Data
  const driverStats = [
    { 
      name: 'Max Verstappen', 
      team: 'Red Bull', 
      points: 575, 
      avgQuali: 1.2, 
      podiums: 15,
      flag: '🇳🇱',
      teamColor: 'team-redbull'
    },
    { 
      name: 'Lando Norris', 
      team: 'McLaren', 
      points: 467, 
      avgQuali: 3.8, 
      podiums: 12,
      flag: '🇬🇧',
      teamColor: 'team-mclaren'
    },
    { 
      name: 'Charles Leclerc', 
      team: 'Ferrari', 
      points: 398, 
      avgQuali: 2.1, 
      podiums: 8,
      flag: '🇲🇨',
      teamColor: 'team-ferrari'
    },
  ]

  // Team Stats Data
  const teamStats = [
    { 
      name: 'Red Bull', 
      engine: 'Honda RBPT', 
      points: 860, 
      reliability: 98.5,
      color: 'team-redbull'
    },
    { 
      name: 'Ferrari', 
      engine: 'Ferrari', 
      points: 677, 
      reliability: 95.2,
      color: 'team-ferrari'
    },
    { 
      name: 'McLaren', 
      engine: 'Mercedes', 
      points: 655, 
      reliability: 97.8,
      color: 'team-mclaren'
    },
  ]

  // Upcoming Races
  const upcomingRaces = [
    { 
      name: 'Monaco Grand Prix', 
      date: 'May 26, 2024', 
      circuit: 'Circuit de Monaco',
      trackMap: '🏎️'
    },
    { 
      name: 'Canadian Grand Prix', 
      date: 'June 9, 2024', 
      circuit: 'Circuit Gilles Villeneuve',
      trackMap: '🏎️'
    },
    { 
      name: 'Spanish Grand Prix', 
      date: 'June 23, 2024', 
      circuit: 'Circuit de Barcelona-Catalunya',
      trackMap: '🏎️'
    },
  ]

  // Predictions Data
  const podiumPredictions = [
    { driver: 'Max Verstappen', probability: 55, team: 'Red Bull' },
    { driver: 'Lando Norris', probability: 20, team: 'McLaren' },
    { driver: 'Charles Leclerc', probability: 15, team: 'Ferrari' },
    { driver: 'Carlos Sainz', probability: 10, team: 'Ferrari' },
  ]

  // Sequential animation effect
  useEffect(() => {
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, 300 + (idx * 120));
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex items-center justify-center h-[280px] md:h-[360px] lg:h-[420px]">
        <img 
          src="https://images.pexels.com/photos/9075316/pexels-photo-9075316.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
          alt="Mercedes F1 Car in Motion" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 select-none"
        />
        <div className="relative text-center max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-white">
            Real-time F1 stats and predictions
          </h2>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Search drivers or teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full px-6 py-4 bg-f1-card/60 backdrop-blur border border-f1-card rounded-xl text-white placeholder-f1-text-secondary focus:outline-none focus:border-f1-accent transition-all duration-200"
            />
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-f1-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            {/* Search Dropdown */}
            {showSearchDropdown && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-f1-card/90 backdrop-blur border border-f1-card rounded-xl shadow-2xl z-50">
                <div className="p-4">
                  <div className="text-sm text-f1-text-secondary mb-2">Drivers</div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                      <span className="text-lg">🇳🇱</span>
                      <span className="text-white">Max Verstappen</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                      <span className="text-lg">🇬🇧</span>
                      <span className="text-white">Lando Norris</span>
                    </div>
                  </div>
                  <div className="text-sm text-f1-text-secondary mb-2 mt-4">Teams</div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                      <span className="text-redbull-blue">🔵</span>
                      <span className="text-white">Red Bull</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                      <span className="text-ferrari-red">🔴</span>
                      <span className="text-white">Ferrari</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Hero decorative checkered flag pattern */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-[length:20px_20px] bg-[linear-gradient(45deg,#050A44_25%,transparent_25%,transparent_75%,#050A44_75%,#050A44),linear-gradient(45deg,#050A44_25%,transparent_25%,transparent_75%,#050A44_75%,#050A44)] bg-[0_0,10px_10px] opacity-20"></div>
      </section>

      {/* Quick Look Tiles */}
      <section className="px-6 lg:px-16 mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLookTiles.map((tile, index) => (
            <div 
              key={index} 
              data-animate="" 
              style={{ animationDelay: `${index * 0.1}s` }}
              className="premium-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{tile.icon}</span>
                <span className={`text-sm font-semibold ${tile.color}`}>{tile.title}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{tile.value}</h3>
              <p className="text-f1-text-secondary text-sm">{tile.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="px-6 lg:px-16 mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-8">Live Stats</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Driver Stats Card */}
          <div className="premium-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🧍</span>
              Driver Stats
            </h3>
            <div className="space-y-4">
              {driverStats.map((driver, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-f1-card/30 rounded-xl hover:bg-f1-card/50 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <span className="text-xl">{driver.flag}</span>
                    <div>
                      <p className="text-body font-semibold text-white">{driver.name}</p>
                      <p className={`text-caption ${driver.teamColor}`}>{driver.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-f1-accent">{driver.points} pts</p>
                    <p className="text-caption text-f1-text-secondary">Avg Quali: {driver.avgQuali}</p>
                    <p className="text-caption text-f1-text-secondary">Podiums: {driver.podiums}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Stats Card */}
          <div className="premium-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              Team Stats
            </h3>
            <div className="space-y-4">
              {teamStats.map((team, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-f1-card/30 rounded-xl hover:bg-f1-card/50 transition-all duration-300">
                  <div>
                    <p className={`text-body font-semibold ${team.color}`}>{team.name}</p>
                    <p className="text-caption text-f1-text-secondary">{team.engine}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-f1-accent">{team.points} pts</p>
                    <p className="text-caption text-f1-text-secondary">Reliability: {team.reliability}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lap Time Trend & Race Schedule */}
      <section className="px-6 lg:px-16 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lap Time Trend */}
          <div className="premium-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              Lap Time Trend
            </h3>
            <div className="h-48 flex items-center justify-center text-f1-text-secondary">
              <p className="text-body">Chart placeholder - Last 5 races lap time comparison</p>
            </div>
          </div>

          {/* Race Schedule */}
          <div className="premium-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">📅</span>
              Race Schedule
            </h3>
            <div className="space-y-4">
              {upcomingRaces.map((race, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-f1-card/30 rounded-xl hover:bg-f1-card/50 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{race.trackMap}</span>
                    <div>
                      <p className="text-body font-semibold text-white">{race.name}</p>
                      <p className="text-caption text-f1-text-secondary">{race.circuit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-caption text-live-green font-semibold">{race.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Predictions Section */}
      <section className="px-6 lg:px-16 mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-8">Predictions</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Probable Podium Chart */}
          <div className="bg-f1-card/60 backdrop-blur rounded-xl border border-f1-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🥇</span>
              Probable Podium
            </h3>
            <div className="space-y-4">
              {podiumPredictions.map((prediction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🏆</span>
                    <div>
                      <p className="text-body font-semibold text-white">{prediction.driver}</p>
                      <p className="text-caption text-f1-text-secondary">{prediction.team}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-f1-card/30 rounded-full h-2">
                      <div 
                        className="bg-f1-accent h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${prediction.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-body font-bold text-f1-accent">{prediction.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Driver Momentum Chart */}
          <div className="bg-f1-card/60 backdrop-blur rounded-xl border border-f1-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">📉</span>
              Driver Momentum
            </h3>
            <div className="h-48 flex items-center justify-center text-f1-text-secondary">
              <p className="text-body">Chart placeholder - Past 5 races performance trend</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 py-10 text-center text-xs text-f1-text-secondary border-t border-f1-card/60">
        © 2024 BoxBoxBox Analytics. All telemetry data is illustrative.
      </footer>
    </div>
  )
}

export default Dashboard 
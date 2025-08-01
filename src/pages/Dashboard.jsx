import { useEffect, useState } from 'react'
import ChromaGrid from '../components/ChromaGrid'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useDriverStandings, useConstructorStandings, useRaceSchedule } from '../hooks/useF1Data'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)

  // API data hooks
  const { data: driverStandings, loading: driversLoading, error: driversError, refetch: refetchDrivers } = useDriverStandings();
  const { data: constructorStandings, loading: constructorsLoading, error: constructorsError, refetch: refetchConstructors } = useConstructorStandings();
  const { data: raceSchedule, loading: scheduleLoading, error: scheduleError, refetch: refetchSchedule } = useRaceSchedule();

  // Transform API data for ChromaGrid
  const transformDriverData = (drivers) => {
    return drivers.slice(0, 3).map(driver => ({
      name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      team: driver.Constructors[0]?.name || 'Unknown',
      points: driver.points,
      avgQuali: 'N/A', // Not available in API
      podiums: driver.wins || 0,
      flag: getFlagEmoji(driver.Driver.nationality),
      borderColor: getTeamColor(driver.Constructors[0]?.constructorId),
      gradient: `linear-gradient(145deg, ${getTeamColor(driver.Constructors[0]?.constructorId)}, #000)`,
      handle: `${driver.Driver.code} - ${driver.position}`
    }));
  };

  const transformConstructorData = (constructors) => {
    return constructors.slice(0, 3).map(constructor => ({
      name: constructor.Constructor.name,
      engine: 'N/A', // Not available in API
      points: constructor.points,
      reliability: 'N/A', // Not available in API
      borderColor: getTeamColor(constructor.Constructor.constructorId),
      gradient: `linear-gradient(145deg, ${getTeamColor(constructor.Constructor.constructorId)}, #000)`,
      handle: `${constructor.Constructor.constructorId.toUpperCase()} - ${constructor.position}`
    }));
  };

  const transformRaceScheduleData = (races) => {
    return races.slice(0, 3).map(race => ({
      name: race.raceName,
      date: new Date(race.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      circuit: race.Circuit.circuitName,
      borderColor: '#3BC4F2',
      gradient: 'linear-gradient(145deg, #3BC4F2, #000)',
      handle: `Round ${race.round}`
    }));
  };

  // Helper functions
  const getTeamColor = (constructorId) => {
    const teamColors = {
      'red_bull': '#1E41FF',
      'ferrari': '#DC143C',
      'mclaren': '#FF8000',
      'mercedes': '#00D2BE',
      'aston_martin': '#006F62',
      'alpine': '#0090FF',
      'williams': '#005AFF',
      'rb': '#1E41FF',
      'sauber': '#52E252',
      'haas': '#FFFFFF'
    };
    return teamColors[constructorId] || '#3BC4F2';
  };

  const getFlagEmoji = (nationality) => {
    const flagMap = {
      'Dutch': '🇳🇱',
      'British': '🇬🇧',
      'Monegasque': '🇲🇨',
      'Spanish': '🇪🇸',
      'Australian': '🇦🇺',
      'Mexican': '🇲🇽',
      'Canadian': '🇨🇦',
      'French': '🇫🇷',
      'Thai': '🇹🇭',
      'Japanese': '🇯🇵',
      'Finnish': '🇫🇮',
      'Chinese': '🇨🇳',
      'Danish': '🇩🇰',
      'German': '🇩🇪',
      'American': '🇺🇸'
    };
    return flagMap[nationality] || '🏁';
  };

  // Quick Look Tiles Data with team colors
  const quickLookTiles = [
    { 
      title: 'Next Race', 
      value: scheduleLoading ? 'Loading...' : (raceSchedule[0]?.raceName || 'TBD'), 
      subtitle: scheduleLoading ? 'Loading...' : (raceSchedule[0] ? new Date(raceSchedule[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'),
      borderColor: '#1E41FF',
      gradient: 'linear-gradient(145deg, #1E41FF, #000)',
      handle: 'Monaco Circuit'
    },
    { 
      title: 'Current Leader', 
      value: driversLoading ? 'Loading...' : (driverStandings[0] ? `${driverStandings[0].Driver.givenName} ${driverStandings[0].Driver.familyName}` : 'TBD'), 
      subtitle: driversLoading ? 'Loading...' : (driverStandings[0] ? `${driverStandings[0].points} points` : 'TBD'),
      borderColor: '#3BC4F2',
      gradient: 'linear-gradient(145deg, #3BC4F2, #000)',
      handle: 'Red Bull Racing'
    },
    { 
      title: 'Constructor Standings', 
      value: constructorsLoading ? 'Loading...' : (constructorStandings[0]?.Constructor.name || 'TBD'), 
      subtitle: constructorsLoading ? 'Loading...' : (constructorStandings[0] ? `${constructorStandings[0].points} points` : 'TBD'),
      borderColor: '#1E41FF',
      gradient: 'linear-gradient(145deg, #1E41FF, #000)',
      handle: 'Championship Leaders'
    },
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

  // Render loading state
  if (driversLoading || constructorsLoading || scheduleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="xl" />
      </div>
    );
  }

  // Render error state
  if (driversError || constructorsError || scheduleError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Error 
          message="Failed to load F1 data. Please check your connection and try again."
          onRetry={() => {
            refetchDrivers();
            refetchConstructors();
            refetchSchedule();
          }}
        />
      </div>
    );
  }

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
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-8">Quick Overview</h2>
        <div style={{ height: '400px', position: 'relative' }}>
          <ChromaGrid 
            items={quickLookTiles}
            radius={300}
            columns={3}
            rows={1}
          />
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="px-6 lg:px-16 mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-8">Driver Performance</h2>
        
        <div style={{ height: '400px', position: 'relative' }}>
          <ChromaGrid 
            items={transformDriverData(driverStandings)}
            radius={300}
            columns={3}
            rows={1}
          />
        </div>
      </section>

      {/* Team Stats Section */}
      <section className="px-6 lg:px-16 mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-8">Constructor Standings</h2>
        
        <div style={{ height: '400px', position: 'relative' }}>
          <ChromaGrid 
            items={transformConstructorData(constructorStandings)}
            radius={300}
            columns={3}
            rows={1}
          />
        </div>
      </section>

      {/* Race Schedule Section */}
      <section className="px-6 lg:px-16 mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-8">Upcoming Races</h2>
        
        <div style={{ height: '400px', position: 'relative' }}>
          <ChromaGrid 
            items={transformRaceScheduleData(raceSchedule)}
            radius={300}
            columns={3}
            rows={1}
          />
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
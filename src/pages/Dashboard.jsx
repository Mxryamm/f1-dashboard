import { useEffect, useState } from 'react'
import ChromaGrid from '../components/ChromaGrid'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { DashboardSkeleton } from '../components/Skeleton'
import { useDriverStandings, useConstructorStandings, useRaceSchedule } from '../hooks/useF1Data'
import { forceRefreshAll, isOnline, getOfflineData } from '../services/ergast'
import { useToast } from '../contexts/ToastContext'
import BlurText from '../components/BlurText'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isOffline, setIsOffline] = useState(!isOnline())

  const { showSuccess, showError, showWarning, showInfo } = useToast()

  // API data hooks
  const { data: driverStandings, loading: driversLoading, error: driversError, refetch: refetchDrivers } = useDriverStandings();
  const { data: constructorStandings, loading: constructorsLoading, error: constructorsError, refetch: refetchConstructors } = useConstructorStandings();
  const { data: raceSchedule, loading: scheduleLoading, error: scheduleError, refetch: refetchSchedule } = useRaceSchedule();

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      showSuccess('Connection restored! Data is now live.')
    }

    const handleOffline = () => {
      setIsOffline(true)
      showWarning('You are offline. Showing cached data.')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [showSuccess, showWarning])

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowSearchDropdown(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const results = []

    // Search in driver standings
    if (driverStandings) {
      driverStandings.forEach(driver => {
        const driverName = `${driver.Driver.givenName} ${driver.Driver.familyName}`.toLowerCase()
        const teamName = driver.Constructors[0]?.name?.toLowerCase() || ''
        
        if (driverName.includes(query) || teamName.includes(query)) {
          results.push({
            type: 'driver',
            name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
            team: driver.Constructors[0]?.name || 'Unknown',
            nationality: driver.Driver.nationality,
            flag: getFlagEmoji(driver.Driver.nationality),
            points: driver.points,
            position: driver.position
          })
        }
      })
    }

    // Search in constructor standings
    if (constructorStandings) {
      constructorStandings.forEach(constructor => {
        const constructorName = constructor.Constructor.name.toLowerCase()
        
        if (constructorName.includes(query)) {
          results.push({
            type: 'constructor',
            name: constructor.Constructor.name,
            points: constructor.points,
            position: constructor.position
          })
        }
      })
    }

    setSearchResults(results.slice(0, 6)) // Limit to 6 results
    setShowSearchDropdown(true)
  }, [searchQuery, driverStandings, constructorStandings])

  // Handle search result click
  const handleSearchResultClick = (result) => {
    setSearchQuery('')
    setShowSearchDropdown(false)
    // You can add navigation logic here if needed
    showInfo(`Selected: ${result.name}`)
  }

  // Handle refresh button click
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await forceRefreshAll();
      // Refetch all data
      await Promise.all([
        refetchDrivers(),
        refetchConstructors(),
        refetchSchedule()
      ]);
      showSuccess('Data refreshed successfully!')
    } catch (error) {
      console.error('Error refreshing data:', error);
      showError('Failed to refresh data. Please try again.')
    } finally {
      setIsRefreshing(false);
    }
  };

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

  // Get data (use offline data if offline)
  const getData = () => {
    if (isOffline) {
      const offlineData = getOfflineData()
      return {
        driverStandings: offlineData.driverStandings,
        constructorStandings: offlineData.constructorStandings,
        raceSchedule: offlineData.raceSchedule
      }
    }
    return {
      driverStandings: driverStandings || [],
      constructorStandings: constructorStandings || [],
      raceSchedule: raceSchedule || []
    }
  }

  const data = getData()

  // Quick Look Tiles Data with team colors
  const quickLookTiles = [
    { 
      title: 'Next Race', 
      value: data.raceSchedule?.[0]?.raceName || 'Loading...',
      subtitle: data.raceSchedule?.[0]?.Circuit?.circuitName || 'Circuit TBD',
      detail: data.raceSchedule?.[0]?.date ? new Date(data.raceSchedule[0].date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }) : 'Date TBD',
      borderColor: '#3BC4F2',
      gradient: 'linear-gradient(145deg, #3BC4F2, #000)'
    },
    { 
      title: 'Championship Leader', 
      value: data.driverStandings?.[0] ? `${data.driverStandings[0].Driver.givenName} ${data.driverStandings[0].Driver.familyName}` : 'Loading...',
      subtitle: data.driverStandings?.[0]?.Constructors?.[0]?.name || 'Team TBD',
      detail: data.driverStandings?.[0] ? `${data.driverStandings[0].points} points` : 'Points TBD',
      borderColor: getTeamColor(data.driverStandings?.[0]?.Constructors?.[0]?.constructorId),
      gradient: `linear-gradient(145deg, ${getTeamColor(data.driverStandings?.[0]?.Constructors?.[0]?.constructorId)}, #000)`
    },
    { 
      title: 'Constructor Leader', 
      value: data.constructorStandings?.[0]?.Constructor?.name || 'Loading...',
      subtitle: 'Team Championship',
      detail: data.constructorStandings?.[0] ? `${data.constructorStandings[0].points} points` : 'Points TBD',
      borderColor: getTeamColor(data.constructorStandings?.[0]?.Constructor?.constructorId),
      gradient: `linear-gradient(145deg, ${getTeamColor(data.constructorStandings?.[0]?.Constructor?.constructorId)}, #000)`
    }
  ];

  // Loading states
  const isLoading = (driversLoading || constructorsLoading || scheduleLoading) && !isOffline;
  const hasError = (driversError || constructorsError || scheduleError) && !isOffline;

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (hasError) {
    return (
      <div className="min-h-screen pt-20">
        <div className="px-6 lg:px-16 py-8">
          <Error 
            message="Failed to load dashboard data" 
            onRetry={handleRefresh}
            className="min-h-[400px]"
          />
        </div>
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
          <BlurText
            text="Real-time F1 stats and insights"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-white"
          />
          
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
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-f1-card/90 backdrop-blur border border-f1-card rounded-xl shadow-2xl z-50">
                <div className="p-4">
                  {searchResults.map((result, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                      onClick={() => handleSearchResultClick(result)}
                    >
                      <span className="text-lg">{result.flag || '🏁'}</span>
                      <div className="flex-1">
                        <span className="text-white font-medium">{result.name}</span>
                        <div className="text-sm text-f1-text-secondary">
                          {result.type === 'driver' ? `${result.team} • ${result.points} pts` : `${result.points} pts`}
                        </div>
                      </div>
                      <span className="text-xs text-f1-accent uppercase">{result.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Hero decorative checkered flag pattern */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-[length:20px_20px] bg-[linear-gradient(45deg,#050A44_25%,transparent_25%,transparent_75%,#050A44_75%,#050A44),linear-gradient(45deg,#050A44_25%,transparent_25%,transparent_75%,#050A44_75%,#050A44)] bg-[0_0,10px_10px] opacity-20"></div>
      </section>

      {/* Header with Refresh Button */}
      <div className="px-6 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <BlurText
              text="F1 Dashboard"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-4xl font-bold text-white mb-2"
            />
            <p className="text-f1-text-secondary text-body">Real-time Formula 1 data and insights</p>
            {isOffline && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-400">📶</span>
                <span className="text-yellow-400 text-sm">Offline Mode - Showing cached data</span>
              </div>
            )}
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isOffline}
            className="flex items-center gap-2 px-4 py-2 bg-f1-accent text-white rounded-lg hover:bg-f1-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRefreshing ? (
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {/* Quick Look Tiles */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Quick Look</h2>
        <ChromaGrid 
          items={quickLookTiles}
          columns={3}
          className="mb-12"
        />
      </div>

      {/* Driver Standings */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Top Drivers</h2>
        <ChromaGrid 
          items={transformDriverData(data.driverStandings)}
          columns={3}
          className="mb-12"
        />
      </div>

      {/* Constructor Standings */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Top Teams</h2>
        <ChromaGrid 
          items={transformConstructorData(data.constructorStandings)}
          columns={3}
          className="mb-12"
        />
      </div>

      {/* Upcoming Races */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Upcoming Races</h2>
        <ChromaGrid 
          items={transformRaceScheduleData(data.raceSchedule)}
          columns={3}
          className="mb-12"
        />
      </div>

      {/* Footer */}
      <footer className="mt-24 py-10 text-center text-xs text-f1-text-secondary border-t border-f1-card/60">
        © 2025 BoxBoxBox Analytics. All telemetry data is illustrative.
      </footer>
    </div>
  )
}

export default Dashboard 
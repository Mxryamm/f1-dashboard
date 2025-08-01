import { useState, useEffect } from 'react'
import ChromaGrid from '../components/ChromaGrid'
import BlurText from '../components/BlurText'

const Standings = () => {
  const [drivers, setDrivers] = useState([])
  const [filteredDrivers, setFilteredDrivers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState('position')
  const [sortDirection, setSortDirection] = useState('asc')

  // Sample driver data with more details
  const driverData = [
    { position: 1, name: 'Max Verstappen', number: '1', country: '🇳🇱 Netherlands', team: 'Red Bull Racing', points: 575, lastRace: 'P1', flag: '🇳🇱', teamColor: 'team-redbull' },
    { position: 2, name: 'Sergio Pérez', number: '11', country: '🇲🇽 Mexico', team: 'Red Bull Racing', points: 285, lastRace: 'P3', flag: '🇲🇽', teamColor: 'team-redbull' },
    { position: 3, name: 'Lewis Hamilton', number: '44', country: '🇬🇧 Great Britain', team: 'Mercedes', points: 234, lastRace: 'P2', flag: '🇬🇧', teamColor: 'team-mercedes' },
    { position: 4, name: 'Carlos Sainz', number: '55', country: '🇪🇸 Spain', team: 'Ferrari', points: 200, lastRace: 'P4', flag: '🇪🇸', teamColor: 'team-ferrari' },
    { position: 5, name: 'Lando Norris', number: '4', country: '🇬🇧 Great Britain', team: 'McLaren', points: 195, lastRace: 'P1', flag: '🇬🇧', teamColor: 'team-mclaren' },
    { position: 6, name: 'Charles Leclerc', number: '16', country: '🇲🇨 Monaco', team: 'Ferrari', points: 170, lastRace: 'P5', flag: '🇲🇨', teamColor: 'team-ferrari' },
    { position: 7, name: 'George Russell', number: '63', country: '🇬🇧 Great Britain', team: 'Mercedes', points: 160, lastRace: 'P6', flag: '🇬🇧', teamColor: 'team-mercedes' },
    { position: 8, name: 'Oscar Piastri', number: '81', country: '🇦🇺 Australia', team: 'McLaren', points: 145, lastRace: 'P7', flag: '🇦🇺', teamColor: 'team-mclaren' },
    { position: 9, name: 'Fernando Alonso', number: '14', country: '🇪🇸 Spain', team: 'Aston Martin', points: 130, lastRace: 'P8', flag: '🇪🇸', teamColor: 'team-aston' },
    { position: 10, name: 'Lance Stroll', number: '18', country: '🇨🇦 Canada', team: 'Aston Martin', points: 115, lastRace: 'P9', flag: '🇨🇦', teamColor: 'team-aston' },
    { position: 11, name: 'Pierre Gasly', number: '10', country: '🇫🇷 France', team: 'Alpine', points: 100, lastRace: 'P10', flag: '🇫🇷', teamColor: 'team-alpine' },
    { position: 12, name: 'Esteban Ocon', number: '31', country: '🇫🇷 France', team: 'Alpine', points: 85, lastRace: 'P11', flag: '🇫🇷', teamColor: 'team-alpine' },
    { position: 13, name: 'Alexander Albon', number: '23', country: '🇹🇭 Thailand', team: 'Williams', points: 70, lastRace: 'P12', flag: '🇹🇭', teamColor: 'team-williams' },
    { position: 14, name: 'Yuki Tsunoda', number: '22', country: '🇯🇵 Japan', team: 'RB', points: 55, lastRace: 'P13', flag: '🇯🇵', teamColor: 'team-rb' },
    { position: 15, name: 'Valtteri Bottas', number: '77', country: '🇫🇮 Finland', team: 'Kick Sauber', points: 40, lastRace: 'P14', flag: '🇫🇮', teamColor: 'team-sauber' },
    { position: 16, name: 'Nico Hulkenberg', number: '27', country: '🇩🇪 Germany', team: 'Haas', points: 30, lastRace: 'P15', flag: '🇩🇪', teamColor: 'team-haas' },
    { position: 17, name: 'Daniel Ricciardo', number: '3', country: '🇦🇺 Australia', team: 'RB', points: 25, lastRace: 'P16', flag: '🇦🇺', teamColor: 'team-rb' },
    { position: 18, name: 'Zhou Guanyu', number: '24', country: '🇨🇳 China', team: 'Kick Sauber', points: 15, lastRace: 'P17', flag: '🇨🇳', teamColor: 'team-sauber' },
    { position: 19, name: 'Kevin Magnussen', number: '20', country: '🇩🇰 Denmark', team: 'Haas', points: 10, lastRace: 'P18', flag: '🇩🇰', teamColor: 'team-haas' },
    { position: 20, name: 'Logan Sargeant', number: '2', country: '🇺🇸 United States', team: 'Williams', points: 5, lastRace: 'P19', flag: '🇺🇸', teamColor: 'team-williams' },
  ]

  // Initialize data
  useEffect(() => {
    setDrivers(driverData)
    setFilteredDrivers(driverData)
  }, [])

  // Search and filter functionality
  useEffect(() => {
    const filtered = drivers.filter(driver =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.country.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredDrivers(filtered)
  }, [searchQuery, drivers])

  // Sorting functionality
  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortDirection(newDirection)

    const sorted = [...filteredDrivers].sort((a, b) => {
      let aVal = a[field]
      let bVal = b[field]

      if (field === 'name' || field === 'team' || field === 'country') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (aVal < bVal) return newDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return newDirection === 'asc' ? 1 : -1
      return 0
    })

    setFilteredDrivers(sorted)
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️'
    return sortDirection === 'asc' ? '↑' : '↓'
  }

  const getPositionColor = (position) => {
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
    if (position === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-black'
    if (position === 3) return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
    return 'bg-f1-card border border-white/10 text-f1-text'
  }

  const getTeamColor = (team) => {
    const teamColors = {
      'Red Bull Racing': '#1E41FF',
      'Ferrari': '#DC143C',
      'McLaren': '#FF8000',
      'Mercedes': '#00D2BE',
      'Aston Martin': '#006F62',
      'Alpine': '#0090FF',
      'Williams': '#005AFF',
      'RB': '#1E41FF',
      'Kick Sauber': '#52E252',
      'Haas': '#FFFFFF'
    }
    return teamColors[team] || '#B3B4BD'
  }

  // Transform driver data for ChromaGrid
  const transformDriverData = (drivers) => {
    return drivers.map(driver => ({
      title: driver.name,
      value: driver.points.toString(),
      subtitle: driver.team,
      detail: `${driver.flag} #${driver.number} | ${driver.lastRace}`,
      borderColor: getTeamColor(driver.team),
      gradient: `linear-gradient(145deg, ${getTeamColor(driver.team)}, #000)`,
      handle: `P${driver.position}`
    }))
  }

  // Transform constructor data for ChromaGrid
  const transformConstructorData = (constructors) => {
    return constructors.map(constructor => ({
      title: constructor.name,
      value: constructor.points.toString(),
      subtitle: 'Constructor',
      detail: `${constructor.wins} wins`,
      borderColor: constructor.color,
      gradient: `linear-gradient(145deg, ${constructor.color}, #000)`,
      handle: constructor.name.toUpperCase()
    }))
  }

  const constructorData = [
    { name: 'Red Bull', points: 860, wins: 15, color: '#1E41FF' },
    { name: 'Ferrari', points: 370, wins: 5, color: '#DC143C' },
    { name: 'McLaren', points: 340, wins: 8, color: '#FF8000' },
    { name: 'Mercedes', points: 394, wins: 2, color: '#00D2BE' },
    { name: 'Aston Martin', points: 245, wins: 0, color: '#006F62' },
    { name: 'Alpine', points: 185, wins: 0, color: '#0090FF' }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="px-6 lg:px-16 py-8">
        <BlurText
          text="Driver Standings"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl md:text-4xl font-bold text-white mb-2"
        />
        <p className="text-f1-text-secondary text-body">Current championship standings and driver performance</p>
      </div>

      {/* Search and Filter */}
      <div className="px-6 lg:px-16 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search drivers, teams, or countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-f1-card/60 backdrop-blur border border-f1-card rounded-xl text-white placeholder-f1-text-secondary focus:outline-none focus:border-f1-accent transition-all duration-200"
            />
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-f1-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="text-caption text-f1-text-secondary">
            Showing {filteredDrivers.length} of {drivers.length} drivers
          </div>
        </div>
      </div>

      {/* Driver Standings Cards */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Top Drivers</h2>
        <ChromaGrid 
          items={transformDriverData(filteredDrivers.slice(0, 9))}
          columns={3}
          className="mb-12"
        />
      </div>

      {/* Constructor Standings */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Constructor Standings</h2>
        <ChromaGrid 
          items={transformConstructorData(constructorData)}
          columns={3}
          className="mb-12"
        />
      </div>
    </div>
  )
}

export default Standings 
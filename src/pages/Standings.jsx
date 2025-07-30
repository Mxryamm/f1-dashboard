import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler)

const Standings = () => {
  const [drivers, setDrivers] = useState([])
  const [filteredDrivers, setFilteredDrivers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState('position')
  const [sortDirection, setSortDirection] = useState('asc')
  const [selectedDriver, setSelectedDriver] = useState('Max Verstappen')

  // Sample driver data
  const driverData = [
    { position: 1, name: 'Max Verstappen', team: 'Red Bull', points: 575, lastRace: 'P1', flag: '🇳🇱', teamColor: 'team-redbull' },
    { position: 2, name: 'Sergio Pérez', team: 'Red Bull', points: 285, lastRace: 'P3', flag: '🇲🇽', teamColor: 'team-redbull' },
    { position: 3, name: 'Lewis Hamilton', team: 'Mercedes', points: 234, lastRace: 'P2', flag: '🇬🇧', teamColor: 'team-mercedes' },
    { position: 4, name: 'Carlos Sainz', team: 'Ferrari', points: 200, lastRace: 'P4', flag: '🇪🇸', teamColor: 'team-ferrari' },
    { position: 5, name: 'Lando Norris', team: 'McLaren', points: 195, lastRace: 'P1', flag: '🇬🇧', teamColor: 'team-mclaren' },
    { position: 6, name: 'Charles Leclerc', team: 'Ferrari', points: 170, lastRace: 'P5', flag: '🇲🇨', teamColor: 'team-ferrari' },
    { position: 7, name: 'George Russell', team: 'Mercedes', points: 160, lastRace: 'P6', flag: '🇬🇧', teamColor: 'team-mercedes' },
    { position: 8, name: 'Oscar Piastri', team: 'McLaren', points: 145, lastRace: 'P7', flag: '🇦🇺', teamColor: 'team-mclaren' },
    { position: 9, name: 'Fernando Alonso', team: 'Aston Martin', points: 130, lastRace: 'P8', flag: '🇪🇸', teamColor: 'team-aston' },
    { position: 10, name: 'Lance Stroll', team: 'Aston Martin', points: 115, lastRace: 'P9', flag: '🇨🇦', teamColor: 'team-aston' },
    { position: 11, name: 'Pierre Gasly', team: 'Alpine', points: 100, lastRace: 'P10', flag: '🇫🇷', teamColor: 'team-alpine' },
    { position: 12, name: 'Esteban Ocon', team: 'Alpine', points: 85, lastRace: 'P11', flag: '🇫🇷', teamColor: 'team-alpine' },
    { position: 13, name: 'Alexander Albon', team: 'Williams', points: 70, lastRace: 'P12', flag: '🇹🇭', teamColor: 'team-williams' },
    { position: 14, name: 'Yuki Tsunoda', team: 'RB', points: 55, lastRace: 'P13', flag: '🇯🇵', teamColor: 'team-rb' },
    { position: 15, name: 'Valtteri Bottas', team: 'Kick Sauber', points: 40, lastRace: 'P14', flag: '🇫🇮', teamColor: 'team-sauber' },
    { position: 16, name: 'Nico Hulkenberg', team: 'Haas', points: 30, lastRace: 'P15', flag: '🇩🇪', teamColor: 'team-haas' },
    { position: 17, name: 'Daniel Ricciardo', team: 'RB', points: 25, lastRace: 'P16', flag: '🇦🇺', teamColor: 'team-rb' },
    { position: 18, name: 'Zhou Guanyu', team: 'Kick Sauber', points: 15, lastRace: 'P17', flag: '🇨🇳', teamColor: 'team-sauber' },
    { position: 19, name: 'Kevin Magnussen', team: 'Haas', points: 10, lastRace: 'P18', flag: '🇩🇰', teamColor: 'team-haas' },
    { position: 20, name: 'Logan Sargeant', team: 'Williams', points: 5, lastRace: 'P19', flag: '🇺🇸', teamColor: 'team-williams' },
  ]

  // Chart data
  const lapTimeData = {
    labels: ['Lap 1', 'Lap 5', 'Lap 10', 'Lap 15', 'Lap 20', 'Lap 25', 'Lap 30', 'Lap 35', 'Lap 40', 'Lap 45'],
    datasets: [
      {
        label: 'Max Verstappen',
        data: [92.1, 91.8, 91.5, 91.2, 90.9, 90.6, 90.3, 90.0, 89.7, 89.4],
        borderColor: '#1E41FF',
        backgroundColor: 'rgba(30, 65, 255, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Lando Norris',
        data: [92.5, 92.2, 91.9, 91.6, 91.3, 91.0, 90.7, 90.4, 90.1, 89.8],
        borderColor: '#FF8000',
        backgroundColor: 'rgba(255, 128, 0, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Lewis Hamilton',
        data: [92.8, 92.5, 92.2, 91.9, 91.6, 91.3, 91.0, 90.7, 90.4, 90.1],
        borderColor: '#00D2BE',
        backgroundColor: 'rgba(0, 210, 190, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  const sectorData = {
    labels: ['Sector 1', 'Sector 2', 'Sector 3'],
    datasets: [
      {
        label: 'Max Verstappen',
        data: [28.5, 32.1, 28.8],
        backgroundColor: '#1E41FF'
      },
      {
        label: 'Lando Norris',
        data: [28.7, 32.3, 29.0],
        backgroundColor: '#FF8000'
      },
      {
        label: 'Lewis Hamilton',
        data: [28.9, 32.5, 29.2],
        backgroundColor: '#00D2BE'
      },
      {
        label: 'Carlos Sainz',
        data: [29.1, 32.7, 29.4],
        backgroundColor: '#DC143C'
      },
      {
        label: 'Charles Leclerc',
        data: [29.3, 32.9, 29.6],
        backgroundColor: '#DC143C'
      }
    ]
  }

  const pointsDistributionData = {
    labels: ['Red Bull', 'Ferrari', 'McLaren', 'Mercedes', 'Aston Martin', 'Others'],
    datasets: [{
      data: [860, 370, 340, 394, 245, 315],
      backgroundColor: [
        '#1E41FF',
        '#DC143C',
        '#FF8000',
        '#00D2BE',
        '#006F62',
        '#B3B4BD'
      ],
      borderWidth: 2,
      borderColor: '#2C2E3A'
    }]
  }

  // Initialize data
  useEffect(() => {
    setDrivers(driverData)
    setFilteredDrivers(driverData)
  }, [])

  // Search and filter functionality
  useEffect(() => {
    const filtered = drivers.filter(driver =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.team.toLowerCase().includes(searchQuery.toLowerCase())
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

      if (field === 'name' || field === 'team') {
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',
          font: { family: 'Inter' }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#B3B4BD', font: { family: 'Inter' } },
        grid: { color: '#2C2E3A' }
      },
      y: {
        ticks: { color: '#B3B4BD', font: { family: 'Inter' } },
        grid: { color: '#2C2E3A' }
      }
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="px-6 lg:px-16 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Driver Standings</h1>
        <p className="text-f1-text-secondary text-body">Current championship standings and performance analysis</p>
      </div>

      {/* Search and Filter */}
      <div className="px-6 lg:px-16 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search drivers or teams..."
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

      {/* Driver Standings Table */}
      <div className="px-6 lg:px-16 mb-12">
        <div className="premium-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-f1-card/30 border-b border-f1-card">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-caption font-semibold text-f1-text-secondary uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('position')}
                  >
                    POS {getSortIcon('position')}
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-caption font-semibold text-f1-text-secondary uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    DRIVER {getSortIcon('name')}
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-caption font-semibold text-f1-text-secondary uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('team')}
                  >
                    TEAM {getSortIcon('team')}
                  </th>
                  <th 
                    className="px-6 py-4 text-right text-caption font-semibold text-f1-text-secondary uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('points')}
                  >
                    POINTS {getSortIcon('points')}
                  </th>
                  <th className="px-6 py-4 text-right text-caption font-semibold text-f1-text-secondary uppercase tracking-wider">
                    LAST RACE
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver, index) => (
                  <tr 
                    key={driver.position} 
                    className="border-b border-f1-card/30 hover:bg-f1-card/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getPositionColor(driver.position)}`}>
                        {driver.position}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{driver.flag}</span>
                        <div>
                          <p className="text-body font-semibold text-white">{driver.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className={`w-3 h-3 rounded-full ${driver.teamColor.replace('team-', 'bg-')}`}></div>
                            <span className="text-caption text-f1-text-secondary">{driver.team}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-body font-medium ${driver.teamColor}`}>{driver.team}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-h3 font-bold text-f1-accent">{driver.points}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-body font-semibold text-white">{driver.lastRace}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Performance Trends Charts */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Performance Trends</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Lap Time Trends */}
          <div className="premium-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Lap Time Trends</h3>
              <select 
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="bg-f1-card/50 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-f1-accent"
              >
                <option value="Max Verstappen">Max Verstappen</option>
                <option value="Lando Norris">Lando Norris</option>
                <option value="Lewis Hamilton">Lewis Hamilton</option>
              </select>
            </div>
            <div className="h-64">
              <Line data={lapTimeData} options={chartOptions} />
            </div>
          </div>

          {/* Sector Times */}
          <div className="premium-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Fastest Sector Times</h3>
            <div className="h-64">
              <Bar data={sectorData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Points Distribution */}
        <div className="premium-card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Championship Points Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="w-96 h-64">
              <Doughnut data={pointsDistributionData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Standings 
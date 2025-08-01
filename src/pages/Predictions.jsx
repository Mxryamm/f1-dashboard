import { useState, useEffect } from 'react'
import ChromaGrid from '../components/ChromaGrid'
import BlurText from '../components/BlurText'

const Predictions = () => {
  const [selectedRace, setSelectedRace] = useState('monaco')
  const [predictions, setPredictions] = useState({})
  const [loading, setLoading] = useState(false)

  // Sample prediction data
  const predictionData = {
    monaco: {
      winner: [
        { driver: 'Max Verstappen', probability: 45, confidence: 'high' },
        { driver: 'Charles Leclerc', probability: 28, confidence: 'medium' },
        { driver: 'Lando Norris', probability: 15, confidence: 'medium' },
        { driver: 'Lewis Hamilton', probability: 8, confidence: 'low' },
        { driver: 'Carlos Sainz', probability: 4, confidence: 'low' }
      ],
      podium: [
        { driver: 'Max Verstappen', probability: 85, confidence: 'high' },
        { driver: 'Charles Leclerc', probability: 72, confidence: 'high' },
        { driver: 'Lando Norris', probability: 65, confidence: 'medium' },
        { driver: 'Lewis Hamilton', probability: 45, confidence: 'medium' },
        { driver: 'Carlos Sainz', probability: 38, confidence: 'low' }
      ],
      fastestLap: [
        { driver: 'Max Verstappen', probability: 40, confidence: 'high' },
        { driver: 'Charles Leclerc', probability: 25, confidence: 'medium' },
        { driver: 'Lando Norris', probability: 20, confidence: 'medium' },
        { driver: 'Lewis Hamilton', probability: 10, confidence: 'low' },
        { driver: 'Carlos Sainz', probability: 5, confidence: 'low' }
      ],
      safetyCar: { probability: 75, confidence: 'high' },
      weather: 'Sunny',
      trackConditions: 'Dry',
      historicalAccuracy: 78
    }
  }

  useEffect(() => {
    setPredictions(predictionData[selectedRace] || predictionData.monaco)
  }, [selectedRace])

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'high': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getConfidenceIcon = (confidence) => {
    switch (confidence) {
      case 'high': return '🔥'
      case 'medium': return '⚡'
      case 'low': return '❄️'
      default: return '❓'
    }
  }

  const getDriverColor = (driverCode) => {
    const colors = {
      'Max Verstappen': '#1E41FF',
      'Charles Leclerc': '#DC143C',
      'Lando Norris': '#FF8000',
      'Lewis Hamilton': '#00D2BE',
      'Carlos Sainz': '#DC143C',
      'George Russell': '#00D2BE',
      'Oscar Piastri': '#FF8000',
      'Fernando Alonso': '#006F62',
      'Lance Stroll': '#006F62',
      'Pierre Gasly': '#0090FF',
      'Esteban Ocon': '#0090FF',
      'Alexander Albon': '#005AFF',
      'Yuki Tsunoda': '#1E41FF',
      'Valtteri Bottas': '#52E252',
      'Nico Hulkenberg': '#FFFFFF',
      'Daniel Ricciardo': '#1E41FF',
      'Zhou Guanyu': '#52E252',
      'Kevin Magnussen': '#FFFFFF',
      'Logan Sargeant': '#005AFF'
    }
    return colors[driverCode] || '#B3B4BD'
  }

  // Transform prediction data for ChromaGrid
  const transformWinnerData = (winners) => {
    return winners.map((winner, index) => ({
      title: `${winner.driver}`,
      value: `${winner.probability}%`,
      subtitle: `Winner Prediction`,
      detail: `${getConfidenceIcon(winner.confidence)} ${winner.confidence} confidence`,
      borderColor: getDriverColor(winner.driver),
      gradient: `linear-gradient(145deg, ${getDriverColor(winner.driver)}, #000)`
    }))
  }

  const transformPodiumData = (podiums) => {
    return podiums.map((podium, index) => ({
      title: `${podium.driver}`,
      value: `${podium.probability}%`,
      subtitle: `Podium Prediction`,
      detail: `${getConfidenceIcon(podium.confidence)} ${podium.confidence} confidence`,
      borderColor: getDriverColor(podium.driver),
      gradient: `linear-gradient(145deg, ${getDriverColor(podium.driver)}, #000)`
    }))
  }

  const transformFastestLapData = (fastestLaps) => {
    return fastestLaps.map((lap, index) => ({
      title: `${lap.driver}`,
      value: `${lap.probability}%`,
      subtitle: `Fastest Lap`,
      detail: `${getConfidenceIcon(lap.confidence)} ${lap.confidence} confidence`,
      borderColor: getDriverColor(lap.driver),
      gradient: `linear-gradient(145deg, ${getDriverColor(lap.driver)}, #000)`
    }))
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="px-6 lg:px-16 py-8">
        <BlurText
          text="Race Predictions"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl md:text-4xl font-bold text-white mb-2"
        />
        <p className="text-f1-text-secondary text-body">AI-powered race performance predictions</p>
      </div>

      {/* Race Selection */}
      <div className="px-6 lg:px-16 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <select
              value={selectedRace}
              onChange={(e) => setSelectedRace(e.target.value)}
              className="w-full px-6 py-4 bg-f1-card/60 backdrop-blur border border-f1-card rounded-xl text-white focus:outline-none focus:border-f1-accent transition-all duration-200"
            >
              <option value="monaco">Monaco Grand Prix</option>
              <option value="bahrain">Bahrain Grand Prix</option>
              <option value="saudi_arabian">Saudi Arabian Grand Prix</option>
              <option value="australian">Australian Grand Prix</option>
              <option value="spanish">Spanish Grand Prix</option>
              <option value="british">British Grand Prix</option>
              <option value="hungarian">Hungarian Grand Prix</option>
              <option value="belgian">Belgian Grand Prix</option>
              <option value="italian">Italian Grand Prix</option>
              <option value="singapore">Singapore Grand Prix</option>
              <option value="japanese">Japanese Grand Prix</option>
              <option value="qatar">Qatar Grand Prix</option>
              <option value="united_states">United States Grand Prix</option>
              <option value="mexico_city">Mexico City Grand Prix</option>
              <option value="sao_paulo">São Paulo Grand Prix</option>
              <option value="las_vegas">Las Vegas Grand Prix</option>
              <option value="abu_dhabi">Abu Dhabi Grand Prix</option>
            </select>
          </div>
          <div className="text-caption text-f1-text-secondary">
            Historical Accuracy: {predictions.historicalAccuracy}%
          </div>
        </div>
      </div>

      {/* Race Conditions */}
      <div className="px-6 lg:px-16 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="chroma-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Weather</h3>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">☀️</span>
              <span className="text-body text-white">{predictions.weather}</span>
            </div>
          </div>
          <div className="chroma-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Track Conditions</h3>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🛣️</span>
              <span className="text-body text-white">{predictions.trackConditions}</span>
            </div>
          </div>
          <div className="chroma-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Safety Car Probability</h3>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🚨</span>
              <span className="text-body text-white">{predictions.safetyCar?.probability}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Winner Predictions */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Winner Predictions</h2>
        <ChromaGrid 
          items={transformWinnerData(predictions.winner || [])}
          columns={3}
          className="mb-12"
        />
      </div>

      {/* Podium Predictions */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Podium Predictions</h2>
        <ChromaGrid 
          items={transformPodiumData(predictions.podium || [])}
          columns={3}
          className="mb-12"
        />
      </div>

      {/* Fastest Lap Predictions */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Fastest Lap Predictions</h2>
        <ChromaGrid 
          items={transformFastestLapData(predictions.fastestLap || [])}
          columns={3}
          className="mb-12"
        />
      </div>

      {/* Prediction Algorithm Info */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Prediction Algorithm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="chroma-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Qualifying Performance</h3>
            <p className="text-f1-text-secondary text-sm">Weighted 30% based on recent qualifying results</p>
          </div>
          <div className="chroma-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Historical Track Data</h3>
            <p className="text-f1-text-secondary text-sm">Weighted 25% based on past performance at this circuit</p>
          </div>
          <div className="chroma-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Current Form</h3>
            <p className="text-f1-text-secondary text-sm">Weighted 25% based on recent race performance</p>
          </div>
          <div className="chroma-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Team Performance</h3>
            <p className="text-f1-text-secondary text-sm">Weighted 20% based on team reliability and pace</p>
          </div>
        </div>
      </div>

      {/* Information Notice */}
      <div className="px-6 lg:px-16 mb-12">
        <div className="chroma-card p-6 bg-blue-500/10 border border-blue-500/20">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">ℹ️ Information</h3>
          <p className="text-f1-text-secondary text-sm">
            These predictions are based on historical data and statistical analysis. 
            Formula 1 racing is highly unpredictable and many factors can influence race outcomes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Predictions 
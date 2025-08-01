import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import ChromaGrid from '../components/ChromaGrid'
import BlurText from '../components/BlurText'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler)

const Analytics = () => {
  const [selectedDriver, setSelectedDriver] = useState('Max Verstappen')

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
        ticks: { color: '#FFFFFF' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        ticks: { color: '#FFFFFF' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  }

  const quickStats = [
    { title: 'Fastest Lap', value: '1:28.456', subtitle: 'Max Verstappen', color: '#1E41FF' },
    { title: 'Avg Lap Time', value: '1:30.123', subtitle: 'Red Bull Racing', color: '#1E41FF' },
    { title: 'Top Speed', value: '345 km/h', subtitle: 'Lando Norris', color: '#FF8000' }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="px-6 lg:px-16 py-8">
        <BlurText
          text="Analytics Dashboard"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl md:text-4xl font-bold text-white mb-2"
        />
        <p className="text-f1-text-secondary text-body">Advanced performance analytics and insights</p>
      </div>

      {/* Quick Stats */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Quick Stats</h2>
        <ChromaGrid 
          items={quickStats.map(stat => ({
            title: stat.title,
            value: stat.value,
            subtitle: stat.subtitle,
            borderColor: stat.color,
            gradient: `linear-gradient(145deg, ${stat.color}, #000)`
          }))}
          columns={3}
          className="mb-12"
        />
      </div>

      {/* Lap Time Analysis */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Lap Time Analysis</h2>
        <div className="chroma-card p-6">
          <div className="h-80">
            <Line data={lapTimeData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Sector Performance */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Sector Performance</h2>
        <div className="chroma-card p-6">
          <div className="h-80">
            <Bar data={sectorData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Points Distribution */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Constructor Points Distribution</h2>
        <div className="chroma-card p-6">
          <div className="h-80">
            <Doughnut data={pointsDistributionData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics 
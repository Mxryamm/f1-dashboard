import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import ChromaGrid from '../components/ChromaGrid'

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
        ticks: { color: '#B3B4BD', font: { family: 'Inter' } },
        grid: { color: '#2C2E3A' }
      },
      y: {
        ticks: { color: '#B3B4BD', font: { family: 'Inter' } },
        grid: { color: '#2C2E3A' }
      }
    }
  }

  // Analytics cards data
  const analyticsCards = [
    {
      title: "Fastest Lap",
      value: "1:28.456",
      subtitle: "Max Verstappen",
      detail: "Lap 42 - Monaco GP"
    },
    {
      title: "Average Lap Time",
      value: "1:30.123",
      subtitle: "Session Average",
      detail: "Based on top 10 drivers"
    },
    {
      title: "Pole Position",
      value: "1:27.567",
      subtitle: "Charles Leclerc",
      detail: "Q3 - Monaco GP"
    },
    {
      title: "Race Pace",
      value: "1:31.234",
      subtitle: "Consistent Pace",
      detail: "±0.5s variance"
    },
    {
      title: "Tire Degradation",
      value: "0.8s",
      subtitle: "Per stint",
      detail: "Medium compound"
    },
    {
      title: "Fuel Efficiency",
      value: "2.1 kg/lap",
      subtitle: "Optimal consumption",
      detail: "Red Bull RB20"
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="px-6 lg:px-16 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Analytics & Performance</h1>
        <p className="text-f1-text-secondary text-body">Advanced telemetry data and performance metrics</p>
      </div>

      {/* Analytics Cards */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Key Metrics</h2>
        <ChromaGrid 
          items={analyticsCards}
          columns={3}
          className="mb-12"
        />
      </div>

      {/* Performance Trends Charts */}
      <div className="px-6 lg:px-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Performance Trends</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Lap Time Trends */}
          <div className="chroma-card p-6">
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
          <div className="chroma-card p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Fastest Sector Times</h3>
            <div className="h-64">
              <Bar data={sectorData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Points Distribution */}
        <div className="chroma-card p-6">
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

export default Analytics 
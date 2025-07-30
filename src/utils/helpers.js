// Utility functions for F1 Dashboard

// Format date to readable string
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Format time to readable string
export const formatTime = (timeString) => {
  if (!timeString) return ''
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Get position color based on position
export const getPositionColor = (position) => {
  switch (position) {
    case 1:
      return 'bg-yellow-500 text-black'
    case 2:
      return 'bg-gray-400 text-black'
    case 3:
      return 'bg-yellow-600 text-white'
    default:
      return 'bg-f1-gray text-white'
  }
}

// Calculate time difference between two dates
export const getTimeUntil = (targetDate) => {
  const now = new Date()
  const target = new Date(targetDate)
  const diff = target - now

  if (diff <= 0) return 'Race in progress'

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

// Format points with proper suffix
export const formatPoints = (points) => {
  if (points === 1) return '1 pt'
  return `${points} pts`
}

// Get team color based on team name
export const getTeamColor = (teamName) => {
  const teamColors = {
    'Red Bull': 'text-blue-400',
    'Ferrari': 'text-red-500',
    'Mercedes': 'text-green-400',
    'McLaren': 'text-orange-400',
    'Aston Martin': 'text-green-500',
    'Alpine': 'text-blue-500',
    'Williams': 'text-blue-600',
    'AlphaTauri': 'text-blue-300',
    'Alfa Romeo': 'text-red-400',
    'Haas': 'text-gray-400'
  }
  return teamColors[teamName] || 'text-gray-300'
} 
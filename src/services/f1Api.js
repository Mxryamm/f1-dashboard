// F1 API service for future integration
// This will handle all API calls to F1 data sources

const BASE_URL = 'https://api.example.com/f1' // Placeholder URL

export const f1Api = {
  // Get driver standings
  async getDriverStandings() {
    // TODO: Implement actual API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull', points: 51 },
          { position: 2, driver: 'Sergio Pérez', team: 'Red Bull', points: 33 },
          { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', points: 27 },
        ])
      }, 500)
    })
  },

  // Get constructor standings
  async getConstructorStandings() {
    // TODO: Implement actual API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { position: 1, team: 'Red Bull Racing', points: 87 },
          { position: 2, team: 'Ferrari', points: 49 },
          { position: 3, team: 'McLaren', points: 28 },
        ])
      }, 500)
    })
  },

  // Get race schedule
  async getRaceSchedule() {
    // TODO: Implement actual API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { name: 'Monaco Grand Prix', date: '2024-05-26', circuit: 'Circuit de Monaco' },
          { name: 'Canadian Grand Prix', date: '2024-06-09', circuit: 'Circuit Gilles Villeneuve' },
          { name: 'Spanish Grand Prix', date: '2024-06-23', circuit: 'Circuit de Barcelona-Catalunya' },
        ])
      }, 500)
    })
  },

  // Get recent race results
  async getRecentResults() {
    // TODO: Implement actual API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { position: 1, driver: 'Lando Norris', team: 'McLaren', points: 25 },
          { position: 2, driver: 'Max Verstappen', team: 'Red Bull', points: 18 },
          { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', points: 15 },
        ])
      }, 500)
    })
  }
} 
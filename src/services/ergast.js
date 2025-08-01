// Base URL for Ergast API
const BASE_URL = 'http://ergast.com/api/f1';

// In-memory cache for API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache helper functions
const getCacheKey = (endpoint, params = {}) => {
  const paramString = Object.keys(params).length > 0 
    ? `?${Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')}` 
    : '';
  return `${endpoint}${paramString}`;
};

const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Generic API request function using fetch
const makeRequest = async (endpoint, params = {}) => {
  const cacheKey = getCacheKey(endpoint, params);
  
  // Check cache first
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    console.log(`Using cached data for: ${endpoint}`);
    return cachedData;
  }

  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.MRData) {
      setCachedData(cacheKey, data.MRData);
      console.log(`Fetched fresh data for: ${endpoint}`);
      return data.MRData;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.warn(`Failed to fetch data from ${endpoint}:`, error.message);
    throw error;
  }
};

// Mock data as fallback
const mockData = {
  driverStandings: {
    StandingsTable: {
      StandingsLists: [{
        season: "2024",
        round: "1",
        DriverStandings: [
          {
            position: "1",
            positionText: "1",
            points: "575",
            wins: "15",
            Driver: {
              driverId: "max_verstappen",
              permanentNumber: "1",
              code: "VER",
              url: "http://en.wikipedia.org/wiki/Max_Verstappen",
              givenName: "Max",
              familyName: "Verstappen",
              dateOfBirth: "1997-09-30",
              nationality: "Dutch"
            },
            Constructors: [{
              constructorId: "red_bull",
              url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
              name: "Red Bull Racing",
              nationality: "Austrian"
            }]
          },
          {
            position: "2",
            positionText: "2",
            points: "467",
            wins: "8",
            Driver: {
              driverId: "lando_norris",
              permanentNumber: "4",
              code: "NOR",
              url: "http://en.wikipedia.org/wiki/Lando_Norris",
              givenName: "Lando",
              familyName: "Norris",
              dateOfBirth: "1999-11-13",
              nationality: "British"
            },
            Constructors: [{
              constructorId: "mclaren",
              url: "http://en.wikipedia.org/wiki/McLaren",
              name: "McLaren",
              nationality: "British"
            }]
          },
          {
            position: "3",
            positionText: "3",
            points: "398",
            wins: "5",
            Driver: {
              driverId: "charles_leclerc",
              permanentNumber: "16",
              code: "LEC",
              url: "http://en.wikipedia.org/wiki/Charles_Leclerc",
              givenName: "Charles",
              familyName: "Leclerc",
              dateOfBirth: "1997-10-16",
              nationality: "Monegasque"
            },
            Constructors: [{
              constructorId: "ferrari",
              url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
              name: "Ferrari",
              nationality: "Italian"
            }]
          }
        ]
      }]
    }
  },
  constructorStandings: {
    StandingsTable: {
      StandingsLists: [{
        season: "2024",
        round: "1",
        ConstructorStandings: [
          {
            position: "1",
            positionText: "1",
            points: "860",
            wins: "15",
            Constructor: {
              constructorId: "red_bull",
              url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
              name: "Red Bull Racing",
              nationality: "Austrian"
            }
          },
          {
            position: "2",
            positionText: "2",
            points: "677",
            wins: "5",
            Constructor: {
              constructorId: "ferrari",
              url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
              name: "Ferrari",
              nationality: "Italian"
            }
          },
          {
            position: "3",
            positionText: "3",
            points: "655",
            wins: "8",
            Constructor: {
              constructorId: "mclaren",
              url: "http://en.wikipedia.org/wiki/McLaren",
              name: "McLaren",
              nationality: "British"
            }
          }
        ]
      }]
    }
  },
  raceSchedule: {
    RaceTable: {
      season: "2024",
      Races: [
        {
          season: "2024",
          round: "1",
          url: "http://en.wikipedia.org/wiki/2024_Bahrain_Grand_Prix",
          raceName: "Bahrain Grand Prix",
          Circuit: {
            circuitId: "bahrain",
            url: "http://en.wikipedia.org/wiki/Bahrain_International_Circuit",
            circuitName: "Bahrain International Circuit",
            Location: {
              lat: "26.0325",
              long: "50.5106",
              locality: "Sakhir",
              country: "Bahrain"
            }
          },
          date: "2024-03-02",
          time: "15:00:00Z"
        },
        {
          season: "2024",
          round: "2",
          url: "http://en.wikipedia.org/wiki/2024_Saudi_Arabian_Grand_Prix",
          raceName: "Saudi Arabian Grand Prix",
          Circuit: {
            circuitId: "jeddah",
            url: "http://en.wikipedia.org/wiki/Jeddah_Corniche_Circuit",
            circuitName: "Jeddah Corniche Circuit",
            Location: {
              lat: "21.6319",
              long: "39.1044",
              locality: "Jeddah",
              country: "Saudi Arabia"
            }
          },
          date: "2024-03-09",
          time: "17:00:00Z"
        }
      ]
    }
  }
};

// API Service Functions
export const getDriverStandings = async () => {
  try {
    const data = await makeRequest('/current/driverStandings.json');
    return data.StandingsTable.StandingsLists[0]?.DriverStandings || [];
  } catch (error) {
    console.warn('Using mock driver standings data');
    return mockData.driverStandings.StandingsTable.StandingsLists[0]?.DriverStandings || [];
  }
};

export const getConstructorStandings = async () => {
  try {
    const data = await makeRequest('/current/constructorStandings.json');
    return data.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
  } catch (error) {
    console.warn('Using mock constructor standings data');
    return mockData.constructorStandings.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
  }
};

export const getRaceResults = async (roundNumber = 'last') => {
  try {
    const endpoint = roundNumber === 'last' 
      ? '/current/results.json' 
      : `/2024/${roundNumber}/results.json`;
    const data = await makeRequest(endpoint);
    return data.RaceTable.Races[0]?.Results || [];
  } catch (error) {
    console.warn('Using mock race results data');
    return [];
  }
};

export const getRaceSchedule = async () => {
  try {
    const data = await makeRequest('/current.json');
    return data.RaceTable.Races || [];
  } catch (error) {
    console.warn('Using mock race schedule data');
    return mockData.raceSchedule.RaceTable.Races || [];
  }
};

export const getCurrentSeason = async () => {
  try {
    const data = await makeRequest('/current.json');
    return data.RaceTable.season;
  } catch (error) {
    console.warn('Using mock season data');
    return "2024";
  }
};

// Helper function to clear cache
export const clearCache = () => {
  cache.clear();
  console.log('API cache cleared');
};

// Helper function to get cache stats
export const getCacheStats = () => {
  return {
    size: cache.size,
    entries: Array.from(cache.keys())
  };
}; 
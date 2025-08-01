// Base URL for Ergast API
const BASE_URL = 'http://ergast.com/api/f1';

// In-memory cache for API responses
const cache = new Map();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes (reduced from 5 minutes)

// LocalStorage cache for offline functionality
const LOCAL_STORAGE_PREFIX = 'f1_dashboard_cache_';
const LOCAL_STORAGE_DURATION = 30 * 60 * 1000; // 30 minutes

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

// LocalStorage cache functions
const getLocalStorageCache = (key) => {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < LOCAL_STORAGE_DURATION) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
  }
  return null;
};

const setLocalStorageCache = (key, data) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.warn('Failed to write to localStorage:', error);
  }
};

// Generic API request function using fetch
const makeRequest = async (endpoint, params = {}, forceRefresh = false) => {
  const cacheKey = getCacheKey(endpoint, params);
  
  // Check cache first (unless force refresh)
  if (!forceRefresh) {
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      console.log(`Using cached data for: ${endpoint}`);
      return cachedData;
    }

    // Check localStorage cache
    const localStorageData = getLocalStorageCache(cacheKey);
    if (localStorageData) {
      console.log(`Using localStorage cache for: ${endpoint}`);
      setCachedData(cacheKey, localStorageData);
      return localStorageData;
    }
  }

  try {
    const url = `${BASE_URL}${endpoint}`;
    console.log(`Fetching fresh data from: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.MRData) {
      setCachedData(cacheKey, data.MRData);
      setLocalStorageCache(cacheKey, data.MRData);
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

// Mock data as fallback (updated with 2025 season data)
const mockData = {
  driverStandings: {
    StandingsTable: {
      StandingsLists: [{
        season: "2025",
        round: "1", // Updated to reflect 2025 season start
        DriverStandings: [
          {
            position: "1",
            positionText: "1",
            points: "25",
            wins: "1",
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
            points: "18",
            wins: "0",
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
          },
          {
            position: "3",
            positionText: "3",
            points: "15",
            wins: "0",
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
          }
        ]
      }]
    }
  },
  constructorStandings: {
    StandingsTable: {
      StandingsLists: [{
        season: "2025",
        round: "1",
        ConstructorStandings: [
          {
            position: "1",
            positionText: "1",
            points: "25",
            wins: "1",
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
            points: "18",
            wins: "0",
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
            points: "15",
            wins: "0",
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
      season: "2025",
      Races: [
        {
          season: "2025",
          round: "1",
          url: "http://en.wikipedia.org/wiki/2025_Australian_Grand_Prix",
          raceName: "Australian Grand Prix",
          Circuit: {
            circuitId: "albert_park",
            url: "http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit",
            circuitName: "Albert Park Grand Prix Circuit",
            Location: {
              lat: "-37.8497",
              long: "144.968",
              locality: "Melbourne",
              country: "Australia"
            }
          },
          date: "2025-03-15",
          time: "05:00:00Z"
        },
        {
          season: "2025",
          round: "2",
          url: "http://en.wikipedia.org/wiki/2025_Japanese_Grand_Prix",
          raceName: "Japanese Grand Prix",
          Circuit: {
            circuitId: "suzuka",
            url: "http://en.wikipedia.org/wiki/Suzuka_International_Racing_Course",
            circuitName: "Suzuka International Racing Course",
            Location: {
              lat: "34.8431",
              long: "136.541",
              locality: "Suzuka",
              country: "Japan"
            }
          },
          date: "2025-03-22",
          time: "06:00:00Z"
        },
        {
          season: "2025",
          round: "3",
          url: "http://en.wikipedia.org/wiki/2025_Chinese_Grand_Prix",
          raceName: "Chinese Grand Prix",
          Circuit: {
            circuitId: "shanghai",
            url: "http://en.wikipedia.org/wiki/Shanghai_International_Circuit",
            circuitName: "Shanghai International Circuit",
            Location: {
              lat: "31.3389",
              long: "121.220",
              locality: "Shanghai",
              country: "China"
            }
          },
          date: "2025-04-05",
          time: "08:00:00Z"
        }
      ]
    }
  }
};

// API Service Functions
export const getDriverStandings = async (forceRefresh = false) => {
  try {
    const data = await makeRequest('/current/driverStandings.json', {}, forceRefresh);
    return data.StandingsTable.StandingsLists[0]?.DriverStandings || [];
  } catch (error) {
    console.warn('Using mock driver standings data');
    return mockData.driverStandings.StandingsTable.StandingsLists[0]?.DriverStandings || [];
  }
};

export const getConstructorStandings = async (forceRefresh = false) => {
  try {
    const data = await makeRequest('/current/constructorStandings.json', {}, forceRefresh);
    return data.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
  } catch (error) {
    console.warn('Using mock constructor standings data');
    return mockData.constructorStandings.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
  }
};

export const getRaceResults = async (roundNumber = 'last', forceRefresh = false) => {
  try {
    const endpoint = roundNumber === 'last' 
      ? '/current/results.json' 
      : `/2025/${roundNumber}/results.json`;
    const data = await makeRequest(endpoint, {}, forceRefresh);
    return data.RaceTable.Races[0]?.Results || [];
  } catch (error) {
    console.warn('Using mock race results data');
    return [];
  }
};

export const getRaceSchedule = async (forceRefresh = false) => {
  try {
    const data = await makeRequest('/current.json', {}, forceRefresh);
    return data.RaceTable.Races || [];
  } catch (error) {
    console.warn('Using mock race schedule data');
    return mockData.raceSchedule.RaceTable.Races || [];
  }
};

export const getCurrentSeason = async (forceRefresh = false) => {
  try {
    const data = await makeRequest('/current.json', {}, forceRefresh);
    return data.RaceTable.season;
  } catch (error) {
    console.warn('Using mock season data');
    return "2025";
  }
};

// Helper function to clear cache
export const clearCache = () => {
  cache.clear();
  // Clear localStorage cache
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(LOCAL_STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Failed to clear localStorage cache:', error);
  }
  console.log('API cache cleared');
};

// Helper function to get cache stats
export const getCacheStats = () => {
  return {
    size: cache.size,
    entries: Array.from(cache.keys()),
    localStorageKeys: Object.keys(localStorage).filter(key => key.startsWith(LOCAL_STORAGE_PREFIX))
  };
};

// Helper function to force refresh all data
export const forceRefreshAll = async () => {
  console.log('Forcing refresh of all data...');
  clearCache();
  
  try {
    await Promise.all([
      getDriverStandings(true),
      getConstructorStandings(true),
      getRaceSchedule(true)
    ]);
    console.log('All data refreshed successfully');
  } catch (error) {
    console.error('Error refreshing data:', error);
  }
};

// Check if we're online
export const isOnline = () => {
  return navigator.onLine;
};

// Get cached data for offline mode
export const getOfflineData = () => {
  const driverStandings = getLocalStorageCache('driverStandings');
  const constructorStandings = getLocalStorageCache('constructorStandings');
  const raceSchedule = getLocalStorageCache('raceSchedule');
  
  return {
    driverStandings: driverStandings || mockData.driverStandings.StandingsTable.StandingsLists[0]?.DriverStandings || [],
    constructorStandings: constructorStandings || mockData.constructorStandings.StandingsTable.StandingsLists[0]?.ConstructorStandings || [],
    raceSchedule: raceSchedule || mockData.raceSchedule.RaceTable.Races || []
  };
}; 
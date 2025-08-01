const BACKEND_URL = 'http://localhost:8000';

// Generic API request function
const makeRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// FastF1 API Service Functions
export const getSessionResults = async (year, race) => {
  try {
    const response = await makeRequest(`/api/session-results/${year}/${race}`);
    return response.data || [];
  } catch (error) {
    console.warn('Failed to fetch session results, using mock data');
    return getMockSessionResults();
  }
};

export const getLapTimes = async (year, race, driver) => {
  try {
    const response = await makeRequest(`/api/lap-times/${year}/${race}/${driver}`);
    return response.data || [];
  } catch (error) {
    console.warn('Failed to fetch lap times, using mock data');
    return getMockLapTimes();
  }
};

export const getTelemetry = async (year, race, driver, lap) => {
  try {
    const response = await makeRequest(`/api/telemetry/${year}/${race}/${driver}/${lap}`);
    return response.data || {};
  } catch (error) {
    console.warn('Failed to fetch telemetry, using mock data');
    return getMockTelemetry();
  }
};

export const getAvailableRaces = async (year) => {
  try {
    const response = await makeRequest(`/api/available-races/${year}`);
    return response.data || [];
  } catch (error) {
    console.warn('Failed to fetch available races, using mock data');
    return getMockAvailableRaces();
  }
};

export const getRaceDrivers = async (year, race) => {
  try {
    const response = await makeRequest(`/api/drivers/${year}/${race}`);
    return response.data || [];
  } catch (error) {
    console.warn('Failed to fetch race drivers, using mock data');
    return getMockRaceDrivers();
  }
};

export const checkBackendHealth = async () => {
  try {
    const response = await makeRequest('/health');
    return response.status === 'healthy';
  } catch (error) {
    console.warn('Backend health check failed');
    return false;
  }
};

// Mock data functions for fallback
const getMockSessionResults = () => [
  {
    position: 1,
    driver_number: "1",
    driver_code: "VER",
    driver_name: "Max Verstappen",
    team: "Red Bull Racing",
    grid_position: 1,
    finish_status: "Finished",
    points: 25,
    laps_completed: 78,
    fastest_lap_time: "1:18.446",
    fastest_lap_speed: "245.6"
  },
  {
    position: 2,
    driver_number: "4",
    driver_code: "NOR",
    driver_name: "Lando Norris",
    team: "McLaren",
    grid_position: 3,
    finish_status: "Finished",
    points: 18,
    laps_completed: 78,
    fastest_lap_time: "1:18.789",
    fastest_lap_speed: "244.2"
  },
  {
    position: 3,
    driver_number: "44",
    driver_code: "HAM",
    driver_name: "Lewis Hamilton",
    team: "Mercedes",
    grid_position: 2,
    finish_status: "Finished",
    points: 15,
    laps_completed: 78,
    fastest_lap_time: "1:19.123",
    fastest_lap_speed: "243.1"
  }
];

const getMockLapTimes = () => [
  {
    lap_number: 1,
    lap_time: "1:20.123",
    sector1_time: "0:25.456",
    sector2_time: "0:30.234",
    sector3_time: "0:24.433",
    lap_speed: 245.6,
    is_valid: true,
    compound: "MEDIUM",
    tyre_life: 5
  },
  {
    lap_number: 2,
    lap_time: "1:19.876",
    sector1_time: "0:25.123",
    sector2_time: "0:29.987",
    sector3_time: "0:24.766",
    lap_speed: 246.2,
    is_valid: true,
    compound: "MEDIUM",
    tyre_life: 6
  },
  {
    lap_number: 3,
    lap_time: "1:19.654",
    sector1_time: "0:24.987",
    sector2_time: "0:29.765",
    sector3_time: "0:24.902",
    lap_speed: 246.8,
    is_valid: true,
    compound: "MEDIUM",
    tyre_life: 7
  }
];

const getMockTelemetry = () => ({
  lap_number: 10,
  driver: "VER",
  data_points: [
    {
      timestamp: "2024-05-26T14:30:15.123Z",
      distance: 1250.5,
      speed: 245.6,
      rpm: 12500,
      throttle: 0.85,
      brake: 0.0,
      gear: 7,
      steering: 0.1,
      x: 1250.5,
      y: 450.2,
      z: 0.0
    },
    {
      timestamp: "2024-05-26T14:30:15.223Z",
      distance: 1275.3,
      speed: 248.2,
      rpm: 12600,
      throttle: 0.90,
      brake: 0.0,
      gear: 7,
      steering: 0.05,
      x: 1275.3,
      y: 452.1,
      z: 0.0
    }
  ]
});

const getMockAvailableRaces = () => [
  { name: 'Bahrain Grand Prix', code: 'bahrain' },
  { name: 'Saudi Arabian Grand Prix', code: 'saudi_arabian' },
  { name: 'Australian Grand Prix', code: 'australian' },
  { name: 'Monaco Grand Prix', code: 'monaco' },
  { name: 'Spanish Grand Prix', code: 'spanish' },
  { name: 'British Grand Prix', code: 'british' },
  { name: 'Hungarian Grand Prix', code: 'hungarian' },
  { name: 'Belgian Grand Prix', code: 'belgian' },
  { name: 'Italian Grand Prix', code: 'italian' },
  { name: 'Singapore Grand Prix', code: 'singapore' },
  { name: 'Japanese Grand Prix', code: 'japanese' },
  { name: 'Qatar Grand Prix', code: 'qatar' },
  { name: 'United States Grand Prix', code: 'united_states' },
  { name: 'Mexico City Grand Prix', code: 'mexico_city' },
  { name: 'São Paulo Grand Prix', code: 'sao_paulo' },
  { name: 'Las Vegas Grand Prix', code: 'las_vegas' },
  { name: 'Abu Dhabi Grand Prix', code: 'abu_dhabi' }
];

const getMockRaceDrivers = () => [
  {
    driver_number: "1",
    driver_code: "VER",
    driver_name: "Max Verstappen",
    team: "Red Bull Racing",
    position: 1,
    points: 25
  },
  {
    driver_number: "4",
    driver_code: "NOR",
    driver_name: "Lando Norris",
    team: "McLaren",
    position: 2,
    points: 18
  },
  {
    driver_number: "44",
    driver_code: "HAM",
    driver_name: "Lewis Hamilton",
    team: "Mercedes",
    position: 3,
    points: 15
  },
  {
    driver_number: "16",
    driver_code: "LEC",
    driver_name: "Charles Leclerc",
    team: "Ferrari",
    position: 4,
    points: 12
  },
  {
    driver_number: "55",
    driver_code: "SAI",
    driver_name: "Carlos Sainz",
    team: "Ferrari",
    position: 5,
    points: 10
  }
];

// Utility functions
export const formatLapTime = (timeString) => {
  if (!timeString || timeString === 'N/A') return 'N/A';
  return timeString;
};

export const formatSpeed = (speed) => {
  if (!speed || speed === 'N/A') return 'N/A';
  return `${speed} km/h`;
};

export const getDriverColor = (driverCode) => {
  const colors = {
    'VER': '#1E41FF', // Red Bull Blue
    'NOR': '#FF8000', // McLaren Orange
    'HAM': '#00D2BE', // Mercedes Teal
    'LEC': '#DC143C', // Ferrari Red
    'SAI': '#DC143C', // Ferrari Red
    'RUS': '#00D2BE', // Mercedes Teal
    'PIA': '#FF8000', // McLaren Orange
    'ALO': '#006F62', // Aston Martin Green
    'STR': '#006F62', // Aston Martin Green
    'GAS': '#0090FF', // Alpine Blue
    'OCO': '#0090FF', // Alpine Blue
    'ALB': '#005AFF', // Williams Blue
    'SAR': '#005AFF', // Williams Blue
    'TSU': '#1E41FF', // RB Blue
    'RIC': '#1E41FF', // RB Blue
    'BOT': '#52E252', // Sauber Green
    'ZHO': '#52E252', // Sauber Green
    'HUL': '#FFFFFF', // Haas White
    'MAG': '#FFFFFF', // Haas White
  };
  return colors[driverCode] || '#B3B4BD';
}; 
import { useState, useEffect, useCallback } from 'react';
import { 
  getDriverStandings, 
  getConstructorStandings, 
  getRaceSchedule,
  getRaceResults,
  getCurrentSeason
} from '../services/ergast';

export const useF1Data = (dataType, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let result;
      
      switch (dataType) {
        case 'driverStandings':
          result = await getDriverStandings();
          break;
        case 'constructorStandings':
          result = await getConstructorStandings();
          break;
        case 'raceSchedule':
          result = await getRaceSchedule();
          break;
        case 'raceResults':
          result = await getRaceResults(options.roundNumber);
          break;
        case 'currentSeason':
          result = await getCurrentSeason();
          break;
        default:
          throw new Error(`Unknown data type: ${dataType}`);
      }

      setData(result);
    } catch (err) {
      setError(err.message);
      console.error(`Error fetching ${dataType}:`, err);
    } finally {
      setLoading(false);
    }
  }, [dataType, options.roundNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch
  };
};

// Specific hooks for different data types
export const useDriverStandings = () => useF1Data('driverStandings');
export const useConstructorStandings = () => useF1Data('constructorStandings');
export const useRaceSchedule = () => useF1Data('raceSchedule');
export const useRaceResults = (roundNumber) => useF1Data('raceResults', { roundNumber });
export const useCurrentSeason = () => useF1Data('currentSeason'); 
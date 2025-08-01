from fastf1 import get_session
import pandas as pd
from functools import lru_cache
import logging
from typing import Dict, List, Optional, Any
import json

logger = logging.getLogger(__name__)

# Cache for expensive operations
_cache = {}

def get_cache_key(func_name: str, *args, **kwargs) -> str:
    """Generate a cache key for function calls"""
    key_parts = [func_name] + [str(arg) for arg in args] + [f"{k}={v}" for k, v in sorted(kwargs.items())]
    return "_".join(key_parts)

def get_cached_data(key: str) -> Optional[Any]:
    """Get data from cache"""
    return _cache.get(key)

def set_cached_data(key: str, data: Any) -> None:
    """Set data in cache"""
    _cache[key] = data

@lru_cache(maxsize=32)
def get_session_results(year: int, race: str) -> List[Dict]:
    """
    Get session results for a specific year and race
    """
    try:
        cache_key = get_cache_key("session_results", year, race)
        cached_data = get_cached_data(cache_key)
        if cached_data:
            logger.info(f"Using cached session results for {year} {race}")
            return cached_data

        logger.info(f"Fetching session results for {year} {race}")
        session = get_session(year, race, 'R')  # 'R' = Race
        session.load()
        
        if session.results is None or session.results.empty:
            logger.warning(f"No results found for {year} {race}")
            return []

        # Convert to list of dictionaries
        results = session.results.to_dict(orient='records')
        
        # Clean and format the data
        formatted_results = []
        for result in results:
            formatted_result = {
                'position': result.get('Position', 'N/A'),
                'driver_number': result.get('DriverNumber', 'N/A'),
                'driver_code': result.get('Abbreviation', 'N/A'),
                'driver_name': f"{result.get('FirstName', '')} {result.get('LastName', '')}".strip(),
                'team': result.get('TeamName', 'N/A'),
                'grid_position': result.get('GridPosition', 'N/A'),
                'finish_status': result.get('Status', 'N/A'),
                'points': result.get('Points', 0),
                'laps_completed': result.get('LapsCompleted', 0),
                'fastest_lap_time': str(result.get('FastestLapTime', 'N/A')),
                'fastest_lap_speed': result.get('FastestLapSpeed', 'N/A')
            }
            formatted_results.append(formatted_result)

        set_cached_data(cache_key, formatted_results)
        return formatted_results

    except Exception as e:
        logger.error(f"Error fetching session results for {year} {race}: {str(e)}")
        return []

@lru_cache(maxsize=32)
def get_lap_times(year: int, race: str, driver_abbr: str) -> List[Dict]:
    """
    Get lap times for a specific driver in a race
    """
    try:
        cache_key = get_cache_key("lap_times", year, race, driver_abbr)
        cached_data = get_cached_data(cache_key)
        if cached_data:
            logger.info(f"Using cached lap times for {driver_abbr} in {year} {race}")
            return cached_data

        logger.info(f"Fetching lap times for {driver_abbr} in {year} {race}")
        session = get_session(year, race, 'R')
        session.load()
        session.load_laps()
        
        # Get driver's laps
        driver_laps = session.laps.pick_driver(driver_abbr)
        
        if driver_laps.empty:
            logger.warning(f"No lap data found for {driver_abbr} in {year} {race}")
            return []

        # Convert to list of dictionaries
        lap_times = []
        for _, lap in driver_laps.iterrows():
            lap_data = {
                'lap_number': int(lap.get('LapNumber', 0)),
                'lap_time': str(lap.get('LapTime', 'N/A')),
                'sector1_time': str(lap.get('Sector1Time', 'N/A')),
                'sector2_time': str(lap.get('Sector2Time', 'N/A')),
                'sector3_time': str(lap.get('Sector3Time', 'N/A')),
                'lap_speed': float(lap.get('SpeedI1', 0)) if pd.notna(lap.get('SpeedI1')) else 0,
                'is_valid': bool(lap.get('IsValid', True)),
                'compound': str(lap.get('Compound', 'N/A')),
                'tyre_life': int(lap.get('TyreLife', 0)) if pd.notna(lap.get('TyreLife')) else 0
            }
            lap_times.append(lap_data)

        set_cached_data(cache_key, lap_times)
        return lap_times

    except Exception as e:
        logger.error(f"Error fetching lap times for {driver_abbr} in {year} {race}: {str(e)}")
        return []

@lru_cache(maxsize=32)
def get_telemetry(year: int, race: str, driver_abbr: str, lap_number: int) -> Dict:
    """
    Get telemetry data for a specific driver and lap
    """
    try:
        cache_key = get_cache_key("telemetry", year, race, driver_abbr, lap_number)
        cached_data = get_cached_data(cache_key)
        if cached_data:
            logger.info(f"Using cached telemetry for {driver_abbr} lap {lap_number} in {year} {race}")
            return cached_data

        logger.info(f"Fetching telemetry for {driver_abbr} lap {lap_number} in {year} {race}")
        session = get_session(year, race, 'R')
        session.load()
        session.load_laps()
        
        # Get specific lap
        driver_laps = session.laps.pick_driver(driver_abbr)
        lap = driver_laps[driver_laps['LapNumber'] == lap_number]
        
        if lap.empty:
            logger.warning(f"No lap {lap_number} found for {driver_abbr} in {year} {race}")
            return {}

        # Get telemetry for the lap
        telemetry_data = lap.iloc[0].get_telemetry()
        
        if telemetry_data.empty:
            logger.warning(f"No telemetry data found for {driver_abbr} lap {lap_number} in {year} {race}")
            return {}

        # Convert to dictionary format
        telemetry_dict = {
            'lap_number': lap_number,
            'driver': driver_abbr,
            'data_points': []
        }

        for _, row in telemetry_data.iterrows():
            data_point = {
                'timestamp': str(row.get('Time', 'N/A')),
                'distance': float(row.get('Distance', 0)) if pd.notna(row.get('Distance')) else 0,
                'speed': float(row.get('Speed', 0)) if pd.notna(row.get('Speed')) else 0,
                'rpm': float(row.get('RPM', 0)) if pd.notna(row.get('RPM')) else 0,
                'throttle': float(row.get('Throttle', 0)) if pd.notna(row.get('Throttle')) else 0,
                'brake': float(row.get('Brake', 0)) if pd.notna(row.get('Brake')) else 0,
                'gear': int(row.get('Gear', 0)) if pd.notna(row.get('Gear')) else 0,
                'steering': float(row.get('Steering', 0)) if pd.notna(row.get('Steering')) else 0,
                'x': float(row.get('X', 0)) if pd.notna(row.get('X')) else 0,
                'y': float(row.get('Y', 0)) if pd.notna(row.get('Y')) else 0,
                'z': float(row.get('Z', 0)) if pd.notna(row.get('Z')) else 0
            }
            telemetry_dict['data_points'].append(data_point)

        set_cached_data(cache_key, telemetry_dict)
        return telemetry_dict

    except Exception as e:
        logger.error(f"Error fetching telemetry for {driver_abbr} lap {lap_number} in {year} {race}: {str(e)}")
        return {}

def get_available_races(year: int) -> List[Dict]:
    """
    Get list of available races for a specific year
    """
    try:
        cache_key = get_cache_key("available_races", year)
        cached_data = get_cached_data(cache_key)
        if cached_data:
            return cached_data

        logger.info(f"Fetching available races for {year}")
        # This would need to be implemented based on available data
        # For now, return a list of common races
        common_races = [
            {'name': 'Bahrain Grand Prix', 'code': 'bahrain'},
            {'name': 'Saudi Arabian Grand Prix', 'code': 'saudi_arabian'},
            {'name': 'Australian Grand Prix', 'code': 'australian'},
            {'name': 'Emilia Romagna Grand Prix', 'code': 'emilia_romagna'},
            {'name': 'Miami Grand Prix', 'code': 'miami'},
            {'name': 'Monaco Grand Prix', 'code': 'monaco'},
            {'name': 'Spanish Grand Prix', 'code': 'spanish'},
            {'name': 'Canadian Grand Prix', 'code': 'canadian'},
            {'name': 'Austrian Grand Prix', 'code': 'austrian'},
            {'name': 'British Grand Prix', 'code': 'british'},
            {'name': 'Hungarian Grand Prix', 'code': 'hungarian'},
            {'name': 'Belgian Grand Prix', 'code': 'belgian'},
            {'name': 'Dutch Grand Prix', 'code': 'dutch'},
            {'name': 'Italian Grand Prix', 'code': 'italian'},
            {'name': 'Singapore Grand Prix', 'code': 'singapore'},
            {'name': 'Japanese Grand Prix', 'code': 'japanese'},
            {'name': 'Qatar Grand Prix', 'code': 'qatar'},
            {'name': 'United States Grand Prix', 'code': 'united_states'},
            {'name': 'Mexico City Grand Prix', 'code': 'mexico_city'},
            {'name': 'São Paulo Grand Prix', 'code': 'sao_paulo'},
            {'name': 'Las Vegas Grand Prix', 'code': 'las_vegas'},
            {'name': 'Abu Dhabi Grand Prix', 'code': 'abu_dhabi'}
        ]

        set_cached_data(cache_key, common_races)
        return common_races

    except Exception as e:
        logger.error(f"Error fetching available races for {year}: {str(e)}")
        return []

def get_race_drivers(year: int, race: str) -> List[Dict]:
    """
    Get list of drivers who participated in a specific race
    """
    try:
        cache_key = get_cache_key("race_drivers", year, race)
        cached_data = get_cached_data(cache_key)
        if cached_data:
            return cached_data

        logger.info(f"Fetching drivers for {year} {race}")
        session = get_session(year, race, 'R')
        session.load()
        
        if session.results is None or session.results.empty:
            logger.warning(f"No results found for {year} {race}")
            return []

        drivers = []
        for _, driver in session.results.iterrows():
            driver_info = {
                'driver_number': driver.get('DriverNumber', 'N/A'),
                'driver_code': driver.get('Abbreviation', 'N/A'),
                'driver_name': f"{driver.get('FirstName', '')} {driver.get('LastName', '')}".strip(),
                'team': driver.get('TeamName', 'N/A'),
                'position': driver.get('Position', 'N/A'),
                'points': driver.get('Points', 0)
            }
            drivers.append(driver_info)

        set_cached_data(cache_key, drivers)
        return drivers

    except Exception as e:
        logger.error(f"Error fetching drivers for {year} {race}: {str(e)}")
        return []

def clear_cache():
    """Clear all cached data"""
    global _cache
    _cache.clear()
    logger.info("Cache cleared")

def get_cache_stats():
    """Get cache statistics"""
    return {
        'cache_size': len(_cache),
        'cached_keys': list(_cache.keys())
    } 
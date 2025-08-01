from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.fastf1_utils import get_session_results, get_lap_times, get_telemetry
from typing import Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="F1 Telemetry API",
    description="FastF1 Python Backend for F1 Telemetry and Timing Data",
    version="1.0.0"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "F1 Telemetry API is running"}

@app.get("/api/session-results/{year}/{race}")
async def session_results(year: int, race: str):
    """
    Get session results for a specific year and race
    """
    try:
        logger.info(f"Fetching session results for {year} {race}")
        results = get_session_results(year, race)
        return {"success": True, "data": results}
    except Exception as e:
        logger.error(f"Error fetching session results: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch session results: {str(e)}")

@app.get("/api/lap-times/{year}/{race}/{driver}")
async def lap_times(year: int, race: str, driver: str):
    """
    Get lap times for a specific driver in a race
    """
    try:
        logger.info(f"Fetching lap times for {driver} in {year} {race}")
        lap_times_data = get_lap_times(year, race, driver)
        return {"success": True, "data": lap_times_data}
    except Exception as e:
        logger.error(f"Error fetching lap times: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch lap times: {str(e)}")

@app.get("/api/telemetry/{year}/{race}/{driver}/{lap}")
async def telemetry(year: int, race: str, driver: str, lap: int):
    """
    Get telemetry data for a specific driver and lap
    """
    try:
        logger.info(f"Fetching telemetry for {driver} lap {lap} in {year} {race}")
        telemetry_data = get_telemetry(year, race, driver, lap)
        return {"success": True, "data": telemetry_data}
    except Exception as e:
        logger.error(f"Error fetching telemetry: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch telemetry: {str(e)}")

@app.get("/api/available-races/{year}")
async def available_races(year: int):
    """
    Get list of available races for a specific year
    """
    try:
        logger.info(f"Fetching available races for {year}")
        from services.fastf1_utils import get_available_races
        races = get_available_races(year)
        return {"success": True, "data": races}
    except Exception as e:
        logger.error(f"Error fetching available races: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch available races: {str(e)}")

@app.get("/api/drivers/{year}/{race}")
async def race_drivers(year: int, race: str):
    """
    Get list of drivers who participated in a specific race
    """
    try:
        logger.info(f"Fetching drivers for {year} {race}")
        from services.fastf1_utils import get_race_drivers
        drivers = get_race_drivers(year, race)
        return {"success": True, "data": drivers}
    except Exception as e:
        logger.error(f"Error fetching drivers: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch drivers: {str(e)}")

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "service": "F1 Telemetry API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 
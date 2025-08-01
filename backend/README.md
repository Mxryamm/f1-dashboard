# F1 Telemetry API Backend

FastF1 Python Backend for F1 Telemetry and Timing Data

## Setup

### Prerequisites
- Python 3.8+
- pip

### Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

### Health Check
- `GET /health` - Check if the API is running

### Session Results
- `GET /api/session-results/{year}/{race}` - Get race results for a specific year and race

### Lap Times
- `GET /api/lap-times/{year}/{race}/{driver}` - Get lap times for a specific driver

### Telemetry Data
- `GET /api/telemetry/{year}/{race}/{driver}/{lap}` - Get telemetry data for a specific lap

### Available Races
- `GET /api/available-races/{year}` - Get list of available races for a year

### Race Drivers
- `GET /api/drivers/{year}/{race}` - Get list of drivers who participated in a race

## Example Usage

### Get 2024 Monaco Grand Prix Results
```bash
curl http://localhost:8000/api/session-results/2024/monaco
```

### Get Max Verstappen's Lap Times
```bash
curl http://localhost:8000/api/lap-times/2024/monaco/VER
```

### Get Telemetry for Lap 10
```bash
curl http://localhost:8000/api/telemetry/2024/monaco/VER/10
```

## Features

- **Caching**: Built-in caching to improve performance
- **Error Handling**: Comprehensive error handling and logging
- **CORS**: Configured for React frontend integration
- **FastF1 Integration**: Uses FastF1 library for real F1 data
- **Async Support**: All endpoints are async for better performance

## Data Format

### Session Results
```json
{
  "success": true,
  "data": [
    {
      "position": 1,
      "driver_number": "1",
      "driver_code": "VER",
      "driver_name": "Max Verstappen",
      "team": "Red Bull Racing",
      "points": 25,
      "laps_completed": 78,
      "fastest_lap_time": "1:18.446"
    }
  ]
}
```

### Lap Times
```json
{
  "success": true,
  "data": [
    {
      "lap_number": 1,
      "lap_time": "1:20.123",
      "sector1_time": "0:25.456",
      "sector2_time": "0:30.234",
      "sector3_time": "0:24.433",
      "lap_speed": 245.6,
      "is_valid": true,
      "compound": "MEDIUM",
      "tyre_life": 5
    }
  ]
}
```

### Telemetry Data
```json
{
  "success": true,
  "data": {
    "lap_number": 10,
    "driver": "VER",
    "data_points": [
      {
        "timestamp": "2024-05-26T14:30:15.123Z",
        "distance": 1250.5,
        "speed": 245.6,
        "rpm": 12500,
        "throttle": 0.85,
        "brake": 0.0,
        "gear": 7,
        "steering": 0.1,
        "x": 1250.5,
        "y": 450.2,
        "z": 0.0
      }
    ]
  }
}
```

## Development

### Running in Development Mode
```bash
uvicorn main:app --reload --port 8000 --host 0.0.0.0
```

### API Documentation
Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Testing Endpoints
You can test the API using the interactive documentation at http://localhost:8000/docs

## Caching

The API uses multiple caching strategies:
- `@lru_cache` decorator for function-level caching
- In-memory cache for expensive operations
- Cache can be cleared using the utility functions

## Error Handling

All endpoints include comprehensive error handling:
- Invalid parameters return 400 Bad Request
- Data not found returns 500 Internal Server Error
- All errors are logged for debugging

## Integration with React Frontend

The API is configured with CORS to work with the React frontend:
- Allowed origins: `http://localhost:3000`, `http://localhost:5173`
- All methods and headers are allowed
- Credentials are supported

## Performance Considerations

- FastF1 data loading can be slow for the first request
- Caching significantly improves subsequent requests
- Consider implementing Redis for production caching
- Monitor memory usage with large datasets 
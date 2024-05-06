import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';


const Weather = () => {
    const [location, setLocation] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);

    const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
    console.log(apiKey)

    const fetchWeather = async () => {
        try {
            const currentUrl = `https://api.weatherbit.io/v2.0/current?city=${location}&key=${apiKey}`;
            const responseCurrent = await fetch(currentUrl);
            const dataCurrent = await responseCurrent.json();
            setCurrentWeather(dataCurrent.data[0]);

            const hourlyUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${location}&key=${apiKey}&hours=24`;
            const responseHourly = await fetch(hourlyUrl);
            const dataHourly = await responseHourly.json();
            setHourlyForecast(dataHourly.data);

            const dailyUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${apiKey}&days=7`;
            const responseDaily = await fetch(dailyUrl);
            const dataDaily = await responseDaily.json();
            setDailyForecast(dataDaily.data);

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <Box sx={{
            flexDirection: 'column',
            alignItems: 'center', 
        }}>
            <TextField 
                fullWidth 
                label="Enter location name" 
                value={location} 
                onChange={e => setLocation(e.target.value)}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    style: { color: 'black', backgroundColor: 'white' }
                }}
                inputProps={{
                    style: { backgroundColor: 'white', color: 'black' }
                }}
            />
            <Button variant="contained" sx={{ mt: 1, mb: 1, bgcolor: 'orange'}} onClick={fetchWeather}>
                Get Weather
            </Button>
            {currentWeather && (
                <Paper elevation={3} sx={{
                    p: 2,
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Current Weather in {currentWeather.city_name}:
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        Temperature: {currentWeather.temp}°C
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        Weather: {currentWeather.weather.description}
                    </Typography>
                    <img src={`https://www.weatherbit.io/static/img/icons/${currentWeather.weather.icon}.png`} alt="Weather Icon" />
                </Paper>
            )}

<Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>Today's Hourly Forecast</Typography>
            <Box sx={{ display: 'flex', overflowX: 'auto', p: 1 }}>
                {hourlyForecast.map((hour, index) => (
                    <Box key={index} sx={{ minWidth: 200, flexShrink: 0, m: 1 }}>
                        <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography>{new Date(hour.timestamp_local).toLocaleTimeString()}: {hour.temp}°C</Typography>
                            <img src={`https://www.weatherbit.io/static/img/icons/${hour.weather.icon}.png`} alt="Weather Icon" style={{ width: '80px' }} />
                        </Paper>
                    </Box>
                ))}
            </Box>

            <Typography variant="h6" sx={{ mt: 2, textAlign: 'center'}}>Daily Forecast for Next Week</Typography>
            <Box sx={{ display: 'flex', overflowX: 'auto', p: 1 }}>
                {dailyForecast.map((day, index) => (
                    <Box key={index} sx={{ minWidth: 200, flexShrink: 0, m: 1 }}>
                        <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography>{new Date(day.valid_date).toDateString()}</Typography>
                            <Typography>High: {day.high_temp}°C</Typography>
                            <Typography>Low: {day.low_temp}°C</Typography>
                            <img src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`} alt="Weather Icon" style={{ width: '80px' }} />
                        </Paper>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Weather;
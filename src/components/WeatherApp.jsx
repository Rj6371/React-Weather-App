import React, { useState } from 'react'
import axios from 'axios';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${`dad85d08d9244b6df5bf12b7a7937448`}`);
      setWeather(response);
    } catch (error) {
      console.log('Weather Data Fetching Problem :', error.message)
    }
  }

  const handleGetWeather = () => {
    fetchWeather();
  }

  return (
    <div className='weather-container'>
      <input
        type="text"
        placeholder='Enter City Name'
        autoFocus
        value={city}
        onChange={handleCityChange}
      /><br /><br /><br />
      <button onClick={handleGetWeather}>Get Weather</button><br /><br />
      {
        weather &&
        <div className='weather-info'>
          <h2>{weather.data.name}</h2><br /><br />
          <p>Temprature : {(weather.data.main.temp)}<sup>o</sup></p><br />
          <p>{weather.data.weather[0].description}</p>
        </div>
      }
    </div>
  )
}

import React, { useState } from 'react'
import axios from 'axios';
import clear from '../../public/images/clear.png';
import cloud from '../../public/images/cloud.png';
import mist from '../../public/images/mist.png';
import rainy from '../../public/images/rainy.png';
import haze from '../../public/images/haze.png';
import errorpage from '../../public/images/errorpage.png';

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${`dad85d08d9244b6df5bf12b7a7937448`}&units=metric`);
      setWeather(response);
    } catch (error) {
      console.log('Weather Data:', error.message)
    }
  }

  const handleGetWeather = () => {
    fetchWeather();
    setCity('');

    if (city === "") {
      setError('Please Enter City Name !')
    } else if (weather.data.clouds.cod == '404') {
      setError('Pleasse Enter Valid City Name !')
    } else {
      setError("")
    }
  }



  return (
    <>
      <div className='weather-container'>
        <input
          type="text"
          placeholder='Enter City Name'
          autoFocus
          value={city}
          onChange={handleCityChange}
        /><br /><br /><br />
        <button onClick={handleGetWeather}>Get Weather</button><br />
        {
          error ?
            <>
              <p>{error}</p>
              <img src={errorpage} />
            </> :
            weather ?
              <div className='weather-info'>
                <h2>{weather.data.name}</h2><br />
                <img src={weather.data.weather[0].main == "Clouds" ? cloud : null} />
                <img src={weather.data.weather[0].main == "Rain" ? rainy : null} />
                <img src={weather.data.weather[0].main == "Clear" ? clear : null} />
                <img src={weather.data.weather[0].main == "Mist" ? mist : null} />
                <img src={weather.data.weather[0].main == "Haze" ? haze : null} />
                <p style={{ fontSize: '1.9rem' }}>{Math.trunc(weather.data.main.temp)}°C</p>
                <p>{weather.data.weather[0].description}</p>
              </div> : ''
        }
      </div>
    </>
  )
}

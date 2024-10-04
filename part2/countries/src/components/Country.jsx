import React, { useState, useEffect } from "react";
import weatherService from "../services/weatherService";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  const { name, capital, area, languages, flags } = country;

  useEffect(() => {
    const capitalCity = Array.isArray(country.capital)
      ? country.capital[0]
      : country.capital;

    const fetchWeatherData = async () => {
      const weatherData = await weatherService.fetchWeather(capitalCity);
      const temperature = weatherData.main.temp;
      const wind = weatherData.wind.speed;
      const weatherIcon = weatherData.weather[0].icon;
      const weatherConditionsObject = {
        temp: temperature,
        icon: weatherIcon,
        windSpeed: wind,
      };
      setWeather(weatherConditionsObject);
      // setWeather(weatherData);
    };
    fetchWeatherData();
  }, [country.capital]);

  console.log("Weather", weather);

  return (
    <div>
      <h2>{name.common}</h2>
      <div>
        <p>
          <strong>Capital:</strong>{" "}
          {Array.isArray(capital) ? capital.join(", ") : capital}
        </p>
        <p>
          <strong>Area:</strong> {area} km²
        </p>
      </div>
      <h3>Languages:</h3>
      <ol>
        {Object.entries(languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ol>
      <img
        src={flags.png}
        alt={`Flag of ${name.common}`}
        style={{ width: "100px" }}
      />
      <h3>Weather in {country.name.common}</h3>
      <p>Temperature: {weather.temp} <span>&deg;C</span></p>
      <img
        src={`https://openweathermap.org/img/w/${weather.icon}.png`}
        alt=""
      />
      <p>Wind Speed: {weather.windSpeed} km/h</p>
    
    </div>
  );
};

export { Country };

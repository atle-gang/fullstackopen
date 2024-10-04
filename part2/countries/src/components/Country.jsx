import React, { useState, useEffect } from "react";
import weatherService from "../services/weatherService";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  const { name, capital, area, languages, flags } = country;

  useEffect(() => {
    const capitalCity = Array.isArray(country.capital) ? country.capital[0] : country.capital;

    const fetchWeatherData = async () => {
      const weatherData = await weatherService.fetchWeather(capitalCity);
      setWeather(weatherData);
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
    </div>
  );
};

export { Country };

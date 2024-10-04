import React from "react";
import { Country } from "./Country";
import { ShowCountryData } from "./ShowCountryData";

const CountriesList = ({ countries, searchQuery }) => {
  if (searchQuery === "") return null;

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return <Country country={country} />;
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (filteredCountries.length < 1) {
    return <p>No countries matching your search</p>;
  }

  return (
    <ul>
      {filteredCountries.map((country) => (
        <li key={country.cca3} style={{ listStyleType: "none" }}>
          {country.name.common} <ShowCountryData country={country} />
        </li>
      ))}
    </ul>
  );
};

export { CountriesList };

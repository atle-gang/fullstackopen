import React from "react";
import { Country } from "./Country";

const CountriesList = ({ countries, searchQuery }) => {
  if (searchQuery === "") return;

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredCountries);

  return (
    <div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        filteredCountries.map((country) => (
          <Country key={country.cca3} country={country} />
        ))
      )}
    </div>
  );
};

export { CountriesList };


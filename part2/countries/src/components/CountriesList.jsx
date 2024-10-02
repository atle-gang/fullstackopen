import React from "react";
import { Country } from "./Country";

const CountriesList = ({ countries, searchQuery }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredCountries.map((country) => {
        return <Country key={country.cca3} country={country} />;
      })}
    </div>
  );
};

export { CountriesList };

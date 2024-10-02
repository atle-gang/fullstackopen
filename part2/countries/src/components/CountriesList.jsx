import React from "react";
import { Country } from "./Country";

const CountriesList = ({ countries, searchQuery }) => {
  if (searchQuery === "") return;

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let displayedInfo;
  if (filteredCountries.length > 10) {
    displayedInfo = <div>Too many matches, specify another filter.</div>;
  } else if (filteredCountries > 1) {
    displayedInfo = (
      <div>
        {filteredCountries.map((country) => {
          <Country key={country.cca3} country={country} />;
        })}
      </div>
    );
  } else if (filteredCountries.length < 1) {
    displayedInfo = <div>No matches found.</div>;
  } else {
    displayedInfo = <Country country={filteredCountries[0]} />;
  }
  return displayedInfo;
};

export { CountriesList };

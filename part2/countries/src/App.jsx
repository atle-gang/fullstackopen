import React from "react";
import { useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import countriesService from "./services/countriesService";
import { CountriesList } from "./components/CountriesList";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const displayCountries = await countriesService.getAllCountries();
        setCountries(displayCountries);
      } catch (error) {
        console.error("Failed to get and load countries", error.message);
      }
    };
    fetchCountries();
  }, []);

  const handleSearchQuery = (event) => {
    const query = event.target.value;

    // Optimising state updates by checking if the new search query is different from the current state.
    // This prevents unnecessary re-renders and improves performance, especially when the input hasn't changed meaningfully.
    if (query === searchQuery) return;

    setSearchQuery(query);
  };

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        handleSearchQuery={handleSearchQuery}
      />
      <CountriesList countries={countries} searchQuery={searchQuery} />
    </div>
  );
};

export { App };

import React from "react";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (event) => {
    const query = event.target.value.trim();

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
    </div>
  );
};

export { App };

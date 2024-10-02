import React from "react";

const SearchBar = ({ searchQuery, handleSearchQuery }) => {
  return (
    <div>
      find countries:{" "}
      <input value={searchQuery} type="text" onChange={handleSearchQuery} />
    </div>
  );
};

export { SearchBar };

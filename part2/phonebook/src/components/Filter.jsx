import React from "react";

const Filter = ({ searchPerson, handleSearch }) => {
  return (
    <div>
      filter shown with: <input value={searchPerson} onChange={handleSearch} />
    </div>
  );
};

export { Filter };

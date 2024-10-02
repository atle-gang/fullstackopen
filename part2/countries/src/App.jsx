import React from 'react'
import { useState } from 'react'
import { SearchBar } from './components/SearchBar';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  }

  return (
    <div>
      <SearchBar searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />
    </div>
  )
}

export { App };
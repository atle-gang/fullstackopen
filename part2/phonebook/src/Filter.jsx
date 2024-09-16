import React from 'react'

const Filter = ({ searchQuery, handleSearchQuery}) => {
  return (
    <div>filter shown with a <input value={searchQuery} onChange={handleSearchQuery} /></div>
  )
}

export { Filter };
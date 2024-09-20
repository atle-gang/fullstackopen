import React from 'react'
import { Person } from './Person';

const Persons = ({ persons, searchQuery }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map((person) => {
        return <Person key={person.id} person={person} />;
      })}
    </div>
  )
}

export { Persons };
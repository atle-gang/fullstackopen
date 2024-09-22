import React from "react";
import { Person } from "./Person";

const Persons = ({ persons, searchQuery, deletePersonEntry }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map((person) => {
        return <Person key={person.id} person={person} deletePersonEntry={deletePersonEntry} />;
      })}
    </div>
  );
};

export { Persons };
import React from "react";
import { useState } from "react";
import { Names } from "./Names";
import { Filter } from "./Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phone book.`);
      return;
    }

    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: persons.length + 1 },
    ]);
    setNewName("");
    setNewNumber("");
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
    console.log(event.target.value);
    return;
  }

  const filteredPersons = () => {

  }

  return (
    <div>
      <h2>Phone book</h2>
      <Filter searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <Names key={person.id} person={person} />;
      })}
    </div>
  );
};

export { App };

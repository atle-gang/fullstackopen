import React from "react";
import { useState } from "react";
// import { Person } from "./Person";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
  };

  return (
    <div>
      <h2>Phone book</h2>
      <Filter searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchQuery={searchQuery} />
    </div>
  );
};

export { App };

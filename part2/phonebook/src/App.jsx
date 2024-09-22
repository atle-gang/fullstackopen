import React from "react";
import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personService from './services/personsService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersonsLoaded) => {
      setPersons(initialPersonsLoaded);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phone book.`);
      setNewName("");
      setNewNumber("");
      return;
    }

    const newPersonObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };

    personService
      .create(newPersonObject)
      .then((updatedPersons) => {
        setPersons(persons.concat(updatedPersons));
        setNewName("");
        setNewNumber("");
      });
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

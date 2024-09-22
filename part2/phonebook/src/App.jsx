import React from "react";
import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personService from "./services/personsService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const initialPersons = await personService.getAll();
        setPersons(initialPersons);
      } catch (error) {
        console.error("Failed to load persons", error);
      }
    };
    fetchPersons();
  }, []);

  const resetInputFields = () => {
    setNewName("");
    setNewNumber("");
  };

  const addNewPerson = async (event) => {
    event.preventDefault();

    const checkIfNameExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const newPersonObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };

    if (checkIfNameExists) {
      const confirmUpdatePerson = window.confirm(
        `${checkIfNameExists.name} is already added to the phone book. Would you like to replace the number with a new one?`
      );
      if (!confirmUpdatePerson) {
        return;
      }
      updatePersonEntry(checkIfNameExists.id, newPersonObject);
    } else {
      try {
        const updatedPersons = await personService.create(newPersonObject);
        setPersons(persons.concat(updatedPersons));
        resetInputFields();
      } catch (error) {
        console.error("Error adding person", error);
        alert("Failed to add person.");
      }
    }
  };

  const deletePersonEntry = (id, name) => {
    const confirmPersonDeletion = window.confirm(
      `Delete ${name} from phone book?`
    );

    if (!confirmPersonDeletion) {
      return;
    }

    personService
      .deleteEntry(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.error(`Failed to delete ${name}`, error.message);
        alert(`Error deleting ${name}.`);
      });
  };

  const updatePersonEntry = (id, updatedPersonObject) => {
    personService.updateEntry(id, updatedPersonObject).then((updatedPerson) => {
      setPersons((previousPersons) =>
        previousPersons.map((person) =>
          person.id === id ? updatedPerson : person
        )
      );
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
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchQuery={searchQuery}
        deletePersonEntry={deletePersonEntry}
      />
    </div>
  );
};

export { App };

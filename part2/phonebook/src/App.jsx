import { useState, useEffect } from "react";
import "./App.css";
import { Names } from "./components/Names";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import axios from "axios";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [filteredPerson, setFilteredPerson] = useState([]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredPerson(initialPersons);
    });
  }, []);

  const appendName = (event) => {
    event.preventDefault();
    console.log(event.target);

    const checkName = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());

    const nameObj = {
      name: newName,
      id: (persons.length + 1).toString(),
      number: newNumber,
    };

    if (checkName) {
      const confirmed = window.confirm(
        `${checkName.name} is already added to the phone book. Update number?`
      );
      if (!confirmed) {
        return;
      }
      personService.update(checkName.id, nameObj).then((updatedPerson) => {
        setPersons((previousPerson) => {
          previousPerson.id === checkName.id ? updatedPerson : persons;
        });
        setFilteredPerson((previousFilteredPerson) => {
          previousFilteredPerson.id === checkName.id ? updatedPerson : persons;
        });
      });
    } else {
      personService.create(nameObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setFilteredPerson(filteredPerson.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePersonEntry = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (!confirmDelete) {
      return;
    }

    personService
      .deleteRequest(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setFilteredPerson(filteredPerson.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.log("Error deleting person, ", error.message);
        alert("Error deleting person");
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
    console.log(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchPerson(event.target.value);
    console.log(event.target.value);

    const filterName = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPerson(filterName);
  };

  return (
    <div>
      <h2>Phone Book</h2>
      <Filter searchPerson={searchPerson} handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        appendName={appendName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        filteredPerson={filteredPerson}
        deletePersonEntry={deletePersonEntry}
      />
    </div>
  );
};

export { App };

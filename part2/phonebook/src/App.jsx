import { useState, useEffect } from "react";
import "./App.css";
import { Names } from "./components/Names";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [filteredPerson, setFilteredPerson] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
      setFilteredPerson(response.data);
    });
  }, []);

  const appendName = (event) => {
    event.preventDefault();
    console.log(event.target);

    const checkName = persons.some((person) => person.name === newName);

    if (checkName) {
      alert(`${newName} is already added to the phone book`);
      setNewName("");
      return;
    }

    const nameObj = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };

    axios.post("http://localhost:3001/persons", nameObj).then((response) => {
      setPersons(persons.concat(nameObj));
      setFilteredPerson(filteredPerson.concat(nameObj));
      setNewName("");
      setNewNumber("");
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
      <Persons filteredPerson={filteredPerson} />
    </div>
  );
};

export { App };

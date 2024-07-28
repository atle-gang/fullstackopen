import { useState } from "react";
import "./App.css";
import { Names } from "./components/Names";

const App = (props) => {
  const [persons, setPersons] = useState(props.persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const appendName = (event) => {
    event.preventDefault();
    console.log(event.target);

    const checkName = persons.some((person) => person.name === newName);

    if (checkName) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      return;
    }

    const nameObj = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };

    setPersons(persons.concat(nameObj));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={appendName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <Names key={person.id} person={person} />;
      })}
    </div>
  );
};

export { App };

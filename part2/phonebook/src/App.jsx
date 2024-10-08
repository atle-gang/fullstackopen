import React from "react";
import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personService from "./services/personsService";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

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
      resetInputFields();
    } else {
      try {
        const updatedPersons = await personService.create(newPersonObject);
        setPersons(persons.concat(updatedPersons));
        resetInputFields();
        setNotification({
          type: "addNotification",
          message: `Added ${newName} to the phone book.`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      } catch (error) {
        console.log("Error", error.response.data.error);
        setNotification({
          type: "errorNotification",
          message: `${error.response.data.error}.`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
      resetInputFields()
    }
  };

  const deletePersonEntry = async (id, name) => {
    const confirmPersonDeletion = window.confirm(
      `Delete ${name} from phone book?`
    );

    if (!confirmPersonDeletion) {
      return;
    }

    try {
      await personService.deleteEntry(id);
      setPersons((previousPersons) =>
        previousPersons.filter((person) => person.id !== id)
      );
      setNotification({
        type: "deleteNotification",
        message: `Deleted ${name} from phone book.`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error(`Failed to delete ${name}`, error.message);
      alert(`Error deleting ${name}.`);
    }
  };

  const updatePersonEntry = async (id, updatedPersonObject) => {
    try {
      const updatedPerson = await personService.updateEntry(
        id,
        updatedPersonObject
      );
      setPersons((previousPersons) =>
        previousPersons.map((person) =>
          person.id === id ? updatedPerson : person
        )
      );
      setNotification({
        type: "updateNotification",
        message: `Updated phone number belonging to ${newName}.`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating person:", error);
      alert(
        `Failed to update phone number belonging to ${updatedPersonObject.name}`
      );
      setNotification({
        type: "errorNotification",
        message: `Information of ${updatedPersonObject.name} has already been removed from the server.`,
      });
    }
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
      <Notification notification={notification} />
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

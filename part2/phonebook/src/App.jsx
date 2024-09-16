import React from 'react'
import { useState } from 'react'
import { Names } from './Names';

const App = (props) => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
        {persons.map((person) => {
           return <Names key={person.id} person={person} />
        })}
    </div>
  )
}

export { App }
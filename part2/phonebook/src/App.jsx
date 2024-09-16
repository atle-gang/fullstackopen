import React from 'react'
import { useState } from 'react'

const App = () => {
  const [person, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
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
    </div>
  )
}

export { App }
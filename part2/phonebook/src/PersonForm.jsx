import React from 'react'

const PersonForm = ({ newName, newNumber, handleNameInput, handleNumberInput, handleSubmit,  }) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <button type="submit">add</button>
      </form>
  )
}

export { PersonForm };
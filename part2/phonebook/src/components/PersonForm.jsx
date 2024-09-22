import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleNameInput,
  handleNumberInput,
  addNewPerson,
}) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input value={newName} onChange={handleNameInput} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberInput} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export { PersonForm };

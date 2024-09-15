import React from "react";
import { Notification } from './Notification';

const PersonForm = ({
  appendName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  // successMessage
}) => {
  return (
    <div>
      {/* {successMessage && <Notification successMessage={successMessage} />} */}
      <form onSubmit={appendName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export { PersonForm };

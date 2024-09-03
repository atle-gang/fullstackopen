import React from "react";

const Names = ({ person, deletePersonEntry }) => {
  return (
    <div>
      {person.name} - {person.number}
      <button onClick={() => deletePersonEntry(person.id, person.name)}>delete</button>
    </div>
  );
};

export { Names };

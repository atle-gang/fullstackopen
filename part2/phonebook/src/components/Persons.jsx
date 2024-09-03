import React from "react";
import { Names } from "./Names";

const Persons = ({ filteredPerson, deletePersonEntry }) => {
  return (
    <div>
      {filteredPerson.map((person) => {
        return <Names key={person.id} person={person} deletePersonEntry={deletePersonEntry} />;
      })}
    </div>
  );
};

export { Persons };

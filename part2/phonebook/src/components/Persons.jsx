import React from "react";
import { Names } from "./Names";

const Persons = ({ filteredPerson }) => {
  return (
    <div>
      {filteredPerson.map((person) => {
        return <Names key={person.id} person={person} />;
      })}
    </div>
  );
};

export { Persons };

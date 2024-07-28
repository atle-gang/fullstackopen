import React from "react";

const Names = ({person}) => {
  return (
    <div>{person.name} - {person.number}</div>
  )
};

export { Names };

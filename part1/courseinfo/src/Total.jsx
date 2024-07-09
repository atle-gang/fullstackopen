const Total = (props) => {
  let total = 0;
  props.parts.forEach((part) => {
    total = total + part.exercises;
  });
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

export { Total };

const Total = (props) => {
    const total = props.parts.reduce((s, p) => s + p.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

export { Total };

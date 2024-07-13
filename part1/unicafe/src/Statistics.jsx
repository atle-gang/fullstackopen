const Statistics = (props) => {
  if (props.allClicks === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  const positive = () => {
    const average = (props.goodClicks / props.allClicks) * 100;
    return average;
  };

  const average = () => {
    const average = (props.goodClicks - props.badClicks) / props.allClicks;
    return average;
  };

  return (
    <div>
      <p>good: {props.goodClicks}</p>
      <p>neutral: {props.neutralClicks}</p>
      <p>bad: {props.badClicks}</p>
      <p>average: {average()}</p>
      <p>positive: {positive()} %</p>
    </div>
  );
};

export { Statistics };

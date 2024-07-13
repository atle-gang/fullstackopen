const Display = (props) => {
  if (props.allClicks === 0) {
    return (
      <div>
        <p>Please give us a rating</p>
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
      <h1>statistics</h1>
      <p>good: {props.goodClicks}</p>
      <p>neutral: {props.neutralClicks}</p>
      <p>bad: {props.badClicks}</p>
      <p>average: {average()}</p>
      <p>positive: {positive()} %</p>
    </div>
  );
};

export { Display };

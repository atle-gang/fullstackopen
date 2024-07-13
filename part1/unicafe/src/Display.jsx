const Display = (props) => {
  if (props.allClicks === 0) {
    return (
      <div>
        <p>Please give us a rating</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <p>good: {props.goodClicks}</p>
      <p>neutral: {props.neutralClicks}</p>
      <p>bad: {props.badClicks}</p>
    </div>
  );
};

export { Display };

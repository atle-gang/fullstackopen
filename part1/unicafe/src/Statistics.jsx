import { StatisticLine } from "./StatisticLine";

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
    return average ;
  };

  return (
    <div>
      <StatisticLine text="good" value={props.goodClicks} />
      <StatisticLine text="neutral" value={props.neutralClicks} />
      <StatisticLine text="bad" value={props.badClicks} />
      <StatisticLine text="average" value={average()} />
      <StatisticLine text="positive" value={positive()} />
    </div>
  );
};

export { Statistics };

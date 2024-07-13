import { useState } from "react";
import "./App.css";
import { Statistics } from "./Statistics";
import { Button } from "./Button";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAll(allClicks + 1)
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(allClicks + 1)
  };

  const handleBad = () => {
    setBad(bad + 1);
    setAll(allClicks + 1)
  };

  return (
    <div>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics allClicks={allClicks} 
      goodClicks={good}
      neutralClicks={neutral}
      badClicks={bad} />
    </div>
  );
}

export { App };

import { Part } from "./Part";

const Content = (props) => {
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
      {/* <Part part={part2} exercises={exercises2} /> */}
      {/* <Part part={part3} exercises={exercises3} /> */}
    </div>
  );
};

export { Content };

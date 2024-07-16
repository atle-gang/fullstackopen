import { Part } from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <div key={part.id}>
          <Part name={part.name} exercises={part.exercises} />
        </div>
      ))}
    </div>
  );
};

export { Content };

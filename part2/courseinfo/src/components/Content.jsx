import { Part } from "./Part";
import { Total } from "./Total";

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    <Total parts={props.parts}/>
    </div>
  );
};

export { Content };

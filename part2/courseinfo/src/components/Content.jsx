import { Part } from "./Part";
import { Total } from "./Total";

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <div key={part.id}>
          <Part name={part.name} exercises={part.exercises} />
        </div>
      ))}
    <Total parts={props.parts}/>
    </div>
  );
};

export { Content };

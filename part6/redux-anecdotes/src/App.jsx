import { AnecdotesList } from "./components/AnecdotesList";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { Filter } from "./components/Filter";
import { Notification } from "./components/Notification";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialiseAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialiseAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;

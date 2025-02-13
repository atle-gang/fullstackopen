import { AnecdotesList } from "./components/AnecdotesList";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { Filter } from "./components/Filter";
import { Notification } from "./components/Notification";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import anecdotesService from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdotesService.getAll().then((anecdotes) => {
      dispatch(setAnecdotes(anecdotes));
    });
  }, [dispatch]);

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

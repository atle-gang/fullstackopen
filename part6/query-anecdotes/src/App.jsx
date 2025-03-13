import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateVote } from "./requests";
import { useNotification, setNotification } from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const { notificationDispatch } = useNotification();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      setNotification(
        notificationDispatch,
        `Voted for "${updatedAnecdote.content}" anecdote`
      );
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  if (result.isError) {
    return (
      <span>Anecdote service not available due to problems in server</span>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [];

const compareVotes = (a, b) => {
  if (a.votes < b.votes) {
    return 1;
  }
  if (a.votes > b.votes) {
    return -1;
  }
  return 0;
};

const anecdoteSlicer = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push({
        content,
        id: getId(),
        votes: 0,
      });
    },
    increaseVote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : updatedAnecdote))
        .sort(compareVotes);
    },
    appendAnecdote(state, action) {
      return action.payload;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, increaseVote, appendAnecdote, setAnecdotes } =
  anecdoteSlicer.actions;
export default anecdoteSlicer.reducer;

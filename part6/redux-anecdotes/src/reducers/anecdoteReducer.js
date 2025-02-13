import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

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
      state.push(content);
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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlicer.reducer;

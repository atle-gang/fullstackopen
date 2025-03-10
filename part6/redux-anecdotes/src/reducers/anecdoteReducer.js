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
    voteAnecdote(state, action) {
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
      return [...state, action.payload].sort(compareVotes);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlicer.actions;

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const increaseVote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const anecdoteToChange = anecdotes.find((a) => a.id === id);
    const updatedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };

    await anecdotesService.update(id, updatedAnecdote);
    dispatch(voteAnecdote(id));
  };
};

export default anecdoteSlicer.reducer;

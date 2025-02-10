import { configureStore } from "@reduxjs/toolkit";
import  filterReducer  from "./src/reducers/filterReducer";
import  anecdoteReducer  from "./src/reducers/anecdoteReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  },
});

export { store };

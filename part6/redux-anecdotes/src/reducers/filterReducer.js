const filterReducer = (state = "", action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      state;
  }

  return state
};

const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export { filterReducer, setFilter };

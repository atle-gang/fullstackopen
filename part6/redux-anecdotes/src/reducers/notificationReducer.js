import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});
// setNotification: setNotificationAction (Destructuring with renaming)
const { setNotification: setNotificationAction, clearNotification } =
  notificationSlice.actions;

let timeoutId = null;

export const setNotification = (message, seconds = 3) => {
  return async (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    dispatch(setNotificationAction(message));

    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
      timeoutId = null;
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;

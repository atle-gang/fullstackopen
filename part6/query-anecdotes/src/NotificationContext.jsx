import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used with NotificationProvider");
  }
  return context;
};

export const setNotification = (dispatch, message, seconds = 5) => {
  dispatch({ type: "SET_NOTIFICATION", payload: message });

  setTimeout(() => {
    dispatch({ type: "CLEAR_NOTIFICATION" });
  }, seconds * 1000);
};

export default NotificationContext;

import React from "react";

const Notification = ({ message, isError }) => {
  if (!message) {
    return null;
  }

  const className = isError ? "error-message" : "success-message";

  return <div className={className}>{className}</div>;
};

export { Notification };

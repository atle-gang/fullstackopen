import React from 'react'

const Notification = ({ successMessage }) => {  
    return (
    <div className="success-message">{successMessage}</div>
  )
}

export { Notification };
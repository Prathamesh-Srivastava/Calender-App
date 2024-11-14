import React from 'react';
import './Notification.css';

const Notification = ({ title, description, time, image, onDismiss, onSnooze }) => {
  return (
    <div className="notification-container">
      {image && <img src={image} alt="Event" className="notification-image" />}
      <div className="notification-content">
        <h3 className="notification-title">{title}</h3>
        <p className="notification-description">{description}</p>
        <p className="notification-time">Time: {time}</p>
      </div>
      <div className="notification-actions">
        <button className="notification-btn" onClick={onDismiss}>Dismiss</button>
        <button className="notification-btn" onClick={onSnooze}>Snooze</button>
      </div>
    </div>
  );
};

export default Notification;

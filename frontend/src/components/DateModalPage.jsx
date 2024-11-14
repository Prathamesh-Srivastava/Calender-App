import React from 'react';
import './DateModalPage.css';

const DateModalPage = ({ selectedDate, eventsOnSelectedDate, handleAddEventClick, handleEditEventClick, handleDeleteEvent, handleDateModalClose }) => {
  return (
    <div className="date-modal-page">
      <h2>Events on {selectedDate.toDateString()}</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddEventClick}>
        Add Event
      </button>
      <button className="btn btn-secondary mb-3" onClick={handleDateModalClose}>
        Back to Calendar
      </button>
      {eventsOnSelectedDate.length > 0 ? (
        <ul className="event-list">
          {eventsOnSelectedDate.map((event) => (
            <li key={event.id} className="event-item">
              {event.media && event.media.type === 'image' && (
                <img src={event.media.url} alt="Event" className="event-image" />
              )}
              <div className="event-details">
                <h5>{event.title}</h5>
                <p>{event.description}</p>
                <div className="event-actions">
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => handleEditEventClick(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events for this date.</p>
      )}
    </div>
  );
};

export default DateModalPage;

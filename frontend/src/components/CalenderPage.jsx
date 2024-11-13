import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventForm from './EventForm';
import Modal from 'react-modal';
import { fetchEvents, createEvent } from '../api/eventsApi';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents().then(setEvents);
    console.log(events);
  },[selectedDate]);


  const eventsOnSelectedDate = selectedDate
  ? events.filter(event => {
    const eventDate = new Date(event.selectedDate);
    if (isNaN(eventDate)) {
      console.error('Invalid event date:', event.selectedDate);
      return false;
    }

    const eventDateString = eventDate.toISOString().split('T')[0];
    const selectedDateString = selectedDate.toISOString().split('T')[0];

    return eventDateString === selectedDateString;
  })
  : [];  

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEventClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEventSave = ({title, description, media}) => {
    const eventData = {title, selectedDate, description, media}
    createEvent(eventData).then(newEvent => {
      setEvents([...events, newEvent]);
    });
    handleModalClose(); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>Event Calendar</h1>

      <div style={{ marginBottom: '20px' }}>
        <Calendar onClickDay={handleDateClick} value={selectedDate}/>
      </div>

      <button onClick={handleAddEventClick} style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Add Event
      </button>

      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h2>Events on {selectedDate ? selectedDate.toDateString() : 'Selected Date'}</h2>
        {eventsOnSelectedDate.length > 0 ? (
          <ul>
            {eventsOnSelectedDate.map(event => (
              <li key={event.id} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '8px' }}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {event.media && event.media.type === 'image' && (
                <img src={event.media.url} alt="Event Media" width="100" />
              )}
              {event.media && event.media.type === 'video' && (
                <video controls width="200">
                  <source src={event.media.url} type="video/mp4" />
                </video>
              )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events for this date.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}>
        <EventForm
          initialDate={selectedDate}
          onClose={handleModalClose}
          onSave={handleEventSave}
        />
      </Modal>
    </div>
  );
};

export default CalendarPage;

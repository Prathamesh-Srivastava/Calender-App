// frontend/src/components/EventsPage.js
import React, { useEffect, useState } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api/eventsApi';
import EventForm from './EventForm';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const handleAddEvent = (eventData) => {
    createEvent(eventData).then(newEvent => {
      setEvents([...events, newEvent]);
    });
  };

  const handleUpdateEvent = (id, updatedData) => {
    updateEvent(id, updatedData).then(updatedEvent => {
      setEvents(events.map(event => event.id === id ? updatedEvent : event));
      setEditingEvent(null);
    });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id).then(() => {
      setEvents(events.filter(event => event.id !== id));
    });
  };

  return (
    <div>
      <h1>Events</h1>
      {editingEvent ? (
        <EventForm
          onSave={(data) => handleUpdateEvent(editingEvent.id, data)}
          initialData={editingEvent}
        />
      ) : (
        <EventForm onSave={handleAddEvent} />
      )}
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>{event.description}</p>
            <button onClick={() => setEditingEvent(event)}>Edit</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;

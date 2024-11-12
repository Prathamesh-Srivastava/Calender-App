import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title} - {new Date(event.date).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CalendarPage.css';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api/eventsApi';
import Calendar from './Calendar';
import DateModalPage from './DateModalPage';
import EventFormPage from './EventFormPage';
import Notification from './Notification';


const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isEventFormModalOpen, setIsEventFormModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [eventsOnSelectedDate, setEventsOnSelectedDate] = useState([]);
  const [alarmOn, setAlarmOn] = useState(false);
  const [eventForAlarm, setEventForAlarm] = useState(null);
  
  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);


useEffect(() => {
  const checkEventTimes = () => {
    const now = new Date();
    const currentTimeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    events.forEach((event) => {
      const eventTime = event.time;
      const eventDate = new Date(event.date);
      console.log(eventTime+" "+currentTimeString);

      if (eventDate.toDateString() === now.toDateString() && eventTime === currentTimeString) {
        console.log("Same:"+ eventTime+" "+currentTimeString);
        setAlarmOn(true);
        setEventForAlarm(event);
      }
    });
  };

  const intervalId = setInterval(checkEventTimes, 60000);

  return () => clearInterval(intervalId);
});
  

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const eventsForDate = getEventsForDate(date);
    setEventsOnSelectedDate(eventsForDate);
    setIsDateModalOpen(true);
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter((event) => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === dateString;
    });
  };

  const handleAddEventClick = () => {
    setEventToEdit(null);
    setIsEventFormModalOpen(true);
  };

  const handleEditEventClick = (event) => {
    setEventToEdit(event);
    setIsEventFormModalOpen(true);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id).then(() => {
      setEvents(events.filter((event) => event.id !== id));
      setEventsOnSelectedDate(eventsOnSelectedDate.filter((event) => event.id !== id));
    });
  };

  const handleEventSave = ({ id, title, description, media, time }) => {
    const eventData = { title:title, date:selectedDate, description:description, media:media, time:time };
    if (id) {
      updateEvent(id, eventData).then((updatedEvent) => {
        setEvents(events.map((event) => (event.id === id ? updatedEvent : event)));
        setEventsOnSelectedDate(
          eventsOnSelectedDate.map((event) => (event.id === id ? updatedEvent : event))
        );
      });
    } else {
      createEvent(eventData).then((newEvent) => {
        setEvents([...events, newEvent]);
        setEventsOnSelectedDate([...eventsOnSelectedDate, newEvent]);
      });
    }
    setIsEventFormModalOpen(false);
  };

  const handleDateModalClose = () => {
    setIsDateModalOpen(false);
  };

  const handleEventFormModalClose = () => {
    setIsEventFormModalOpen(false);
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleDismiss = () => {
    setAlarmOn(false);
  };

  const handleSnooze = () => {
    console.log('Snoozed for 5 minute');
    setAlarmOn(false);
    setTimeout(() => setAlarmOn(true), 5 * 60 * 1000);
  };

  return (
    <div className="calendar-page-container">
      {alarmOn && (
        <Notification
          title={eventForAlarm.title}
          description={eventForAlarm.description}
          time={eventForAlarm.time}
          image={eventForAlarm.media}
          onDismiss={handleDismiss}
          onSnooze={handleSnooze}
        />
      )}

      {isDateModalOpen && !isEventFormModalOpen && (
        <DateModalPage
          selectedDate={selectedDate}
          eventsOnSelectedDate={eventsOnSelectedDate}
          handleAddEventClick={handleAddEventClick}
          handleEditEventClick={handleEditEventClick}
          handleDeleteEvent={handleDeleteEvent}
          handleDateModalClose={handleDateModalClose}
        />
      )}

      {isEventFormModalOpen && (
        <EventFormPage
          eventToEdit={eventToEdit}
          onSave={handleEventSave}
          onClose={handleEventFormModalClose}
        />
      )}

      {!isDateModalOpen && !isEventFormModalOpen && (
        <Calendar
        selectedDate={selectedDate}
        handleDateClick={handleDateClick}
        events={events}
        onNextMonth = {handleNextMonth}
        onPrevMonth = {handlePrevMonth}
      />      
      )}
    </div>
  );
};

export default CalendarPage;

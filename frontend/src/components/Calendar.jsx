import React from 'react';
import './Calendar.css';

const Calendar = ({ selectedDate, handleDateClick, events, onNextMonth, onPrevMonth }) => {
  const generateCalendar = () => {
    const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const daysInMonth = endOfMonth.getDate();
    const firstDayOfWeek = startOfMonth.getDay();

    const calendarDays = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
    }

    return calendarDays;
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events
      .filter((event) => {
        const eventDate = new Date(event.date).toISOString().split('T')[0];
        return eventDate === dateString;
      })
      .slice(0, 2); // Limit to top two events
  };

  const calendarDays = generateCalendar();

  return (
    <div className="calendar-container">
      <h1 className="text-center mb-4">Event Calendar</h1>
      {/* Month Navigation */}
        <div className="month-nav">
            <button className="btn btn-secondary" onClick={onPrevMonth}>
            Previous
            </button>
            <span className="month-year">
            {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
            </span>
            <button className="btn btn-secondary" onClick={onNextMonth}>
            Next
            </button>
        </div>

      <div className="calendar-grid">
        {calendarDays.map((date, index) => {
          const eventsForDate = date ? getEventsForDate(date) : [];
          return (
            <div
              key={index}
              className={`calendar-cell ${date ? 'date-cell' : 'empty-cell'}`}
              onClick={() => date && handleDateClick(date)}
            >
              {date && <div className="date-number">{date.getDate()}</div>}
              {eventsForDate.length > 0 && (
                <div className="event-titles">
                  {eventsForDate.map((event, i) => (
                    <p key={i} className="event-title">{event.title}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

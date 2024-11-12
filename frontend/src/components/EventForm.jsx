import React, { useState, useEffect } from 'react';

const EventForm = ({ onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, date, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EventForm;

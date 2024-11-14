import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const EventFormPage = ({ eventToEdit, onClose, onSave }) => {
  const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : '');
  const [description, setDescription] = useState(eventToEdit ? eventToEdit.description : '');
  const [media, setMedia] = useState(eventToEdit ? eventToEdit.media : null);
  const [time, setTime] = useState(eventToEdit ? eventToEdit.time : '12:00'); // New time state

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith('image') ? 'image' : 'video';
    setMedia({ url, type });
  };

  // Configure dropzone
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { title, description, media, time }; // Include time in event data
    if (eventToEdit) {
      eventData.id = eventToEdit.id;
    }
    onSave(eventData);
  };

  const handleEventFormModalClose = () => {
    onClose();
  };

  return (
    <div className="event-form-page">
      <h2>{eventToEdit ? 'Edit Event' : 'Create Event'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Time Input */}
        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        {/* File upload area with drag and drop */}
        <div
          {...getRootProps()}
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          <input {...getInputProps()} />
          {media ? (
            media.type === 'image' ? (
              <img src={media.url} alt="Preview" width="200" />
            ) : (
              <video src={media.url} controls width="200" />
            )
          ) : (
            <p>Drag 'n' drop a file here, or click to select one</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Event
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2 mt-3"
          onClick={handleEventFormModalClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EventFormPage;

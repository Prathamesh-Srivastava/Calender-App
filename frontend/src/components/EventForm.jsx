import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const EventForm = ({ initialDate, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith('image') ? 'image' : 'video';
    setMedia({ url, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({title, description, media });
    onClose();
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form onSubmit={handleSubmit}>
      <h3>Event on {initialDate ? initialDate.toDateString() : ''}</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event Description"
      />
      <div {...getRootProps()} style={{ border: '1px dashed gray', padding: '10px', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        {media ? (
          media.type === 'image' ? (
            <img src={media.url} alt="Preview" width="100" />
          ) : (
            <video src={media.url} controls width="200" />
          )
        ) : (
          <p>Drag 'n' drop a file here, or click to select one</p>
        )}
      </div>
      <button type="submit">Save Event</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EventForm;

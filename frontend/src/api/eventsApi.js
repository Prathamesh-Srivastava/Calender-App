import axios from 'axios';

const API_URL = 'http://localhost:3000/events';

export const fetchEvents = () => axios.get(API_URL).then(res => res.data);

export const createEvent = (event) => axios.post(API_URL, event).then(res => res.data);

export const updateEvent = (id, updatedData) => axios.patch(`${API_URL}/${id}`, updatedData).then(res => res.data);

export const deleteEvent = (id) => axios.delete(`${API_URL}/${id}`);

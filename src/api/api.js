import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Owner API
export const registerOwner = (data) => API.post('/owners/register', data);

// PG API
export const addPG = (data) => API.post('/owners/pg/add', data);
export const getPGListings = (ownerId) => API.get(`/owners/pg/${ownerId}`);
export const updatePG = (pgId, data) => API.put(`/owners/pg/${pgId}`, data);
export const deletePG = (pgId) => API.delete(`/owners/pg/${pgId}`);
export const respondToInquiry = (pgId, inquiryId, response) => 
    API.put(`/owners/pg/${pgId}/inquiry/${inquiryId}/respond`, { response });

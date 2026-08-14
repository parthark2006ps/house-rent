import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://house-rent-elin.onrender.com/api',
});

// Add Authorization header with JWT token if stored
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('househunt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Auth API
export const apiLogin = (data) => API.post('/auth/login', data);
export const apiRegister = (data) => API.post('/auth/register', data);
export const apiGetMe = () => API.get('/auth/me');

// Property API
export const apiGetProperties = (params) => API.get('/properties', { params });
export const apiGetPropertyById = (id) => API.get(`/properties/${id}`);
export const apiCreateProperty = (data) => API.post('/properties', data);
export const apiApproveProperty = (id) => API.put(`/properties/${id}/approve`);
export const apiRejectProperty = (id) => API.put(`/properties/${id}/reject`);
export const apiDeleteProperty = (id) => API.delete(`/properties/${id}`);

// Booking API
export const apiCreateBooking = (data) => API.post('/bookings', data);
export const apiGetMyBookings = () => API.get('/bookings/my-bookings');
export const apiGetAllBookings = () => API.get('/bookings/all-bookings');
export const apiUpdateBookingStatus = (id, status) => API.put(`/bookings/${id}/status`, { status });

// Stats API
export const apiGetStats = () => API.get('/stats');

export default API;

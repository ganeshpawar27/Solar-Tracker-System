import axios from 'axios';

const api = axios.create({
  baseURL: 'https://solar-track-backend-ulkp.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
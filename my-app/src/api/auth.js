import axios from 'axios';

export const login = async (email, password) => {
  const response = await axios.post('/api/login', { email, password });
  return response.data;
};

export const fetchDashboardData = async () => {
  const response = await axios.get('/api/dashboard');
  return response.data;
};
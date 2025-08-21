import api from './authService';

export const userService = {
  // Get all users (protected)
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get user by ID (protected)
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user (protected)
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user (protected)
  deleteUser: async (id) => {
    await api.delete(`/users/${id}`);
  }
};
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {

  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    lastActivity: Date.now(),
    urlApiDomain: "http://wiguns-backend.test/storage/", // URL API didefinisikan di sini

  }),
  actions: {
    setUser(user, token) {
      this.user = user;
      this.token = token;
      this.lastActivity = Date.now();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('lastActivity', this.lastActivity);
    },
    
    
    clearUser() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('lastActivity');
    },
    updateActivity() {
      this.lastActivity = Date.now();
      localStorage.setItem('lastActivity', this.lastActivity);
    },
    async fetchUserById(userId) {
      try {
        const response = await axios.get(`http://wiguns-backend.test/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${this.token}` // Sertakan token jika dibutuhkan
          }
        });        
        
        this.setUser(response.data.user, this.token); // Update user state
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async updateUser(userId, formData) {
      try {
        const response = await axios.put(`http://wiguns-backend.test/api/users/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${this.token}`, // Sertakan token jika dibutuhkan
          }
        });
    
        // Memperbarui state dengan data yang diterima dari server setelah berhasil
        this.setUser(response.data.user, this.token);
        console.log('Profile updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating profile:', error);
        // Anda bisa menambahkan penanganan error di sini
      }
    }
    
  }
});



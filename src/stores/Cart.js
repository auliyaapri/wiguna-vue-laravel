  import { defineStore } from 'pinia';
  import axios from 'axios';

  export const useCartStore = defineStore('cart', {
    state: () => ({
      items: [],
      total: 0,
      totalQuantity: 0,
      loading: false,
      error: null,
      user: null,
    }),

    actions: {
      async fetchCart() {
        this.loading = true; // Set loading ke true saat memulai
        this.error = null; // Reset error

        const token = localStorage.getItem('token'); // Mengambil authStore untuk mendapatkan token
        if (!token) {
          this.error = 'User is not authenticated';
          this.loading = false;
          return; // Jika token tidak ada, keluar dari fungsi
        }
        try {
          const response = await axios.get(`http://wiguns-backend.test/api/carts`, {
            headers: {
              Authorization: `Bearer ${token}`, // Menggunakan token dari localStorage
            },
          });
          console.log('Response from API:', response.data); // Menampilkan hasil respons di konsol
          // Memeriksa apakah ada data dalam response
          if (response.data.data && response.data.data.length > 0) {
            this.items = response.data.data; // Menyimpan item ke dalam state
          } else {
            this.error = 'No items found in cart'; // Menangani kasus tidak ada item
          }
          this.calculateTotal(); // Menghitung total setelah mendapatkan item
          this.calculateTotalQuantity(); // Hitung total jumlah item
        } catch (error) {
          console.error('Error fetching cart:', error);
          this.error = 'Failed to fetch cart data'; // Set error message
        } finally {
          this.loading = false; // Set loading ke false setelah selesai
        }
      },

      addItem(item) {
        this.items.push(item);
        this.calculateTotal();
        this.calculateTotalQuantity();
      },

      removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.calculateTotal();
        this.calculateTotalQuantity();
      },
      
      clearCart() {
        this.items = []; // Mengosongkan array items
        this.total = 0; // Reset total
        this.totalQuantity = 0; // Reset total quantity
      },

      calculateTotal() {
        this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      calculateTotalQuantity() {
        this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
      },
    },
  });

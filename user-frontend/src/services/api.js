// import axios from 'axios';

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// // attach token
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // AUTH
// export const loginUser = (data) => API.post('/api/auth/login/', data);
// export const registerUser = (data) => API.post('/api/auth/register/', data);

// // USERS
// export const getUsers = () => API.get('/api/auth/me/');

// // PRODUCTS
// export const getProducts = () => API.get('/api/products/products/');
// export const createProduct = (data) => API.post('/api/products/products/', data);

// // // ORDERS
// // export const getOrders = () => API.get('/api/orders/orders/');
// // export const createOrder = (data) => API.post('/api/orders/orders/', data);

// export default API;


// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refresh: refreshToken,
          });

          localStorage.setItem('authToken', response.data.access);
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export const loginUser = (credentials) =>
  api.post('api/auth/login/', credentials);

export const registerUser = (userData) =>
  api.post('api/auth/register/', userData);

// USERS
export const getUsers = () => 
api.get('api/auth/me/');

export const getProducts = (params) =>
  // api.get('/products', { params });
  api.get('api/products/products/', { params });


export const createProduct = (data) => 
  api.post('api/products/products/', data);

export const getProductById = (id) =>
  api.get(`api/products/products/${id}`);

export const createOrder = (orderData) =>
  api.post('api/orders', orderData);

export const getOrders = () =>
  api.get('api/orders');

// export const getDashboardStats = () =>
//   api.get('/dashboard/stats');

export default api;
// src/services/api.ts

import axios from 'axios';
import { ERROR_MESSAGES } from 'commons/messages';

// Aquí luego puedes obtener el token desde un storage más seguro o cookie
const getToken = () => {
  return localStorage.getItem('accessToken');
};

// En caso de manejar refresh token
const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const baseURL = 'http://localhost:8080';

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000, // 10s
});

// Interceptor de request: agrega el token a cada request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/// src/services/api.ts
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expirado → intenta refrescarlo
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${baseURL}/auth/refresh-token`, {
          refreshToken: getRefreshToken(),
        });

        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    if (!error.response) {
      return Promise.reject({
        userMessage: ERROR_MESSAGES.NETWORK,
        message: 'Network Error',
        status: 0,
      });
    }

    const customError = error.response.data;

    return Promise.reject({
      userMessage: customError?.userMessage || ERROR_MESSAGES.UNKNOWN,
      message: customError?.message || ERROR_MESSAGES.GENERIC,
      status: error.response.status,
    });
  },
);

export default api;

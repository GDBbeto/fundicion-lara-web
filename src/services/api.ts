import axios from 'axios';
import { ERROR_MESSAGES } from 'commons/messages';
import { AUTH_API_BASE } from './apiRoutes';

// Aqui luego puedes obtener el token desde un storage mas seguro o cookie
const getToken = () => {
  return localStorage.getItem('accessToken');
};

// En caso de manejar refresh token
const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

// Base URL desde variables de entorno, por defecto localhost para desarrollo
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

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
        // Usar la misma ruta que authService.ts
        const res = await api.post(`/${AUTH_API_BASE}/refresh`, {
          refreshToken: getRefreshToken(),
        });

        const { accessToken, refreshToken: newRefreshToken } = res.data.data;

        // Actualizar ambos tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Reintentar la petición original con el nuevo token
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, hacer logout completo
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject({
          userMessage: ERROR_MESSAGES.UNAUTHORIZED,
          message: 'Unauthorized',
          status: 401,
        });
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

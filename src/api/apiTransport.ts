import axios from 'axios';
import { BASE_URL, DEFAULT_HEADERS, LS_KEY_API_TOKEN } from './const';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { ...DEFAULT_HEADERS },
});

export const axiosInstanceWithCredentials = axios.create({
  baseURL: BASE_URL,
  headers: { ...DEFAULT_HEADERS },
});

axiosInstanceWithCredentials.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(LS_KEY_API_TOKEN) ?? '';

    config.headers.Authorization = `${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

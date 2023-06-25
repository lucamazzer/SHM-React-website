import axios from 'axios';
export const DEFAULT_RETRIES = 2;
export const CONFIG_TIMEOUT = 0;
export const API_URL = 'http://localhost/api/';

const apiConfig = {
  baseURL: API_URL,
  timeout: CONFIG_TIMEOUT,
  headers: {
    Authorisation: '',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
};

const api = axios.create(apiConfig);

export default api;

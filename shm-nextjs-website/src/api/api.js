import { create } from 'apisauce';

export const DEFAULT_RETRIES = 2;
export const CONFIG_TIMEOUT = 40000;
export const API_URL = 'localhost:3001/';
const api = create({
  baseURL: API_URL,
  timeout: 30000
});

export default api;

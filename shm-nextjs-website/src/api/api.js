
import axios from 'axios'
export const DEFAULT_RETRIES = 2
export const CONFIG_TIMEOUT = 40000
export const API_URL = 'http://localhost:3001/' // 'http://backend.shm.com:3001/';

const apiConfig = {
  baseURL: API_URL,
  timeout: CONFIG_TIMEOUT,
  headers: {
    Authorisation: '',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
}

const api = axios.create(apiConfig)

export default api

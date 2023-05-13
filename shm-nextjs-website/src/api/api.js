import { create } from 'apisauce';
import { CHANNELS } from 'shared/constants/common';

export const DEFAULT_RETRIES = 2;
export const CONFIG_TIMEOUT = 40000;

const api = create({
  baseURL: 'localhost:3000',
  timeout: 30000
});

export default api;

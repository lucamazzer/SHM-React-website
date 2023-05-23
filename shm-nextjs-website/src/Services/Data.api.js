import api, { API_URL } from '@/api/api';

export const eraseSD = async () => {
  const { data, error } = await api.post('borrar_SD');
  return { data, error };
};

export const downloadFiles = async () => {
  window.open(`${API_URL}download_files`);
};

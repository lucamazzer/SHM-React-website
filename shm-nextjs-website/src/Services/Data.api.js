import api, { API_URL } from '@/api/api';

export const eraseSD = async () => {
  try {
    const { data, error } = await api.post('borrar_SD');
    return { data, error };
  } catch (error) {
    return { error };
  }
};

export const downloadFiles = async () => {
  window.open(`${API_URL}download_files`);
};

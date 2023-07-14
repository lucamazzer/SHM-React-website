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

export const deleteMeasure = async id => {
  try {
    const { data, error } = await api.post('erase_reading', {
      nro_muestreo: id,
    });
    return { data, error };
  } catch (error) {
    return { error };
  }
};
export const deleteAllMeasure = async id => {
  try {
    const { data, error } = await api.post('erase_all_reading');
    return { data, error };
  } catch (error) {
    return { error };
  }
};

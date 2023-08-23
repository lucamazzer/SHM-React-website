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
    return {
      error: { message: 'Error al borrar la medición' },
    };
  }
};
export const deleteAllMeasure = async id => {
  try {
    const { data, error } = await api.post('erase_all_reading');
    return { data, error };
  } catch (error) {
    return { error: { message: 'Error al borrar las mediciones' } };
  }
};

export const generateCsv = async id => {
  try {
    const { data, error } = await api.post('create_csv', {
      nro_muestreo: id,
    });
    return { data, error };
  } catch (error) {
    return { error: { message: 'No se pudo crear los csv' } };
  }
};


export const cancelDownloads = async () => {
  try {
    const { data, error } = await api.post('cancel_downloads');
    return { data, error };
  } catch (error) {
    return { error: { message: 'No se pudo cancelar la descarga' } };
  }
}

export const checkDownloadInProgress = async () => {
  try {
    const { data, error } = await api.post('check_download_in_progress');
    return { data, error };
  } catch (error) {
    return { error: { message: 'Error al consultar por descarga en progreso' } };
  }
}
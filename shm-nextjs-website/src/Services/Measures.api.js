import api from '@/api/api';

export const initMeasure = async ({
  startTime,
  duration,
  id,
  sync,
  timeout,
}) => {
  try {
    const { data, error } = await api.post('init_measure', {
      epoch_inicio: startTime,
      duracion_muestreo: duration,
      nro_muestreo: id,
      sync,
      timeout,
    });
    return { data, error };
  } catch (error) {
    return { error: { message: error?.response?.data?.error } };
  }
};

export const cancelMeasure = async id => {
  try {
    const { data, error } = await api.post('cancelar_muestreo', {
      nro_muestreo: id,
    });
    return { data, error };
  } catch (error) {
    return { error: { message: error?.response?.data?.error } };
  }
};

export const getMeasureStatus = async sync => {
  try {
    const { data, error } = await api.post('check_measure_status', {
      sync,
    });
    return { data, error };
  } catch (error) {
    return { error: { message: error?.response?.data?.error } };
  }
};

import api from '@/api/api';

export const initMeasure = async ({
  startTime,
  duration,
  id,
  sync,
  timeout,
  comment,
}) => {
  try {
    const { data, error } = await api.post('init_measure', {
      epoch_inicio: startTime,
      duracion_muestreo: duration,
      nro_muestreo: id,
      sync,
      timeout,
      comment,
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

export const getMeasureStatus = async (sync, measureId) => {
  try {
    const { data, error } = await api.post('check_measure_status', {
      sync,
      nro_muestreo: measureId,
    });
    return { data, error };
  } catch (error) {
    return { error: { message: error?.response?.data?.error } };
  }
};

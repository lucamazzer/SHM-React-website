import api from '@/api/api';

export const initMeasure = async ({ startTime, duration, id, sync }) => {
  try {
    const { data, error } = await api.post('form_inicio', {
      epoch_inicio: startTime,
      duracion_muestreo: duration,
      nro_muestreo: id,
      sync,
    });
    return { data, error };
  } catch (error) {
    return { error };
  }
};

export const cancelMeasure = async id => {
  try {
    const { data, error } = await api.post('cancelar_muestreo', {
      nro_muestreo: id,
    });
    return { data, error };
  } catch (error) {
    return { error };
  }
};

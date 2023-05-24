import api from '@/api/api';

export const initMeasure = async ({ startTime, duration, id, sync }) => {
  const { data, error } = await api.post('form_inicio', {
    epoch_inicio: startTime,
    duracion_muestreo: duration,
    nro_muestro: id,
    sync,
  });
  return { data, error };
};

export const cancelMeasure = async id => {
  const { data, error } = await api.post('cancelar_muestreo', {
    nro_muestro: id,
  });
  return { data, error };
};

import api from './api';

export const initSyncMeasure = async (startTime, duration,id) => {
  const {data, error} = await api.post('form_inicio', {epoch_inicio: startTime, duracion_muestreo: duration, nro_muestro: id, sync: true});
  return {data, error};
}

export const initAsyncMeasure = async (startTime, duration,id) => {
    const {data, error} = await api.post('form_inicio', {epoch_inicio: startTime, duracion_muestreo: duration, nro_muestro: id, sync: false});
    return {data, error};
  
}


 export const cancelMeasure = async (id) => {
    const {data, error} = await api.post('cancelar_muestreo', {nro_muestro: id});
    return {data, error};
 }


 
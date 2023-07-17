import api from '../api/api.js';

export const restartNodes = async () => {
  try {
    const { data, error } = await api.post('reiniciar_nodos');
    return { data, error };
  } catch (error) {
    return {
      error: {
        message: error?.response?.data?.error || 'error reiniciando nodos',
      },
    };
  }
};

export const getNodesStates = async () => {
  try {
    const { data, error } = await api.get('actualizar_estados');
    return { data, error };
  } catch (error) {
    return {
      error: {
        message:
          error?.response?.data?.error || 'error obteniendo estado de nodos',
      },
    };
  }
};

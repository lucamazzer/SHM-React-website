import api from '../api/api.js';

export const restartNodes = async () => {
  try {
    const { data, error } = await api.post('reiniciar_nodos');
    return { data, error };
  } catch (error) {
    return { error };
  }
};

export const getNodesStates = async () => {
  try {
    const { data, error } = await api.get('estados_nodos');
    return { data, error };
  } catch (error) {
    return { error };
  }
};

import api from '../api/api.js';

export const restartNodes = async () => {
  const { data, error } = await api.post('reiniciar_nodos');
  return { data, error };
};

export const getNodesStates = async () => {
  const response = await api.get('actualizar_estados');
  return response;
};

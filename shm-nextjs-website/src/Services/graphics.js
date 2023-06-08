import api from '../api/api.js';

export const getGraphData = async () => {
  const { data, error } = await api.get('graph_readings/304');
  return { data, error };
};

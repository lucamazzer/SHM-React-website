import api from '../api/api.js';

export const getGraphData = async id => {
  try {
    const { data, error } = await api.get(`graph_readings/${id}`);
    console.log('error', error);

    return {
      data,
      error: error
        ? { message: `Hubo un error o la medición ${id} no existe` }
        : null,
    };
  } catch (error) {
    console.log(error);

    return {
      error: {
        message:
          error?.response?.data?.error?.message ||
          `Hubo un error o la medición ${id} no existe`,
      },
    };
  }
};

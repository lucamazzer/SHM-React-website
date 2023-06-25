import api from '@/api/api';

export const configSystem = async (user, psw, brokerIP) => {
  try {
    const { data, error } = await api.post('form_config_sistema', {
      ip_mqtt: brokerIP,
      usr_mqtt: user,
      pass_mqtt: psw,
    });
    return { data, error };
  } catch (error) {
    return {
      error: {
        message: `Hubo un error configurando el sistema, intente nuevamente`,
      },
    };
  }
};

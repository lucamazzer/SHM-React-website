export const configSystem = async (user, psw, brokerIP) => {
    const { data, error } = await api.post('form_config_sistema', { ip_mqtt: brokerIP, usr_mqtt: user, pass_mqtt: psw });
    return { data, error };
    }
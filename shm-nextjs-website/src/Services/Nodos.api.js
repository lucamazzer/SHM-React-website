export const restartNodes = async () => {
    const {data, error} = await api.post('reiniciar_nodos');
    return {data, error};
    }

export const getNodesStates = async () => {
    const {data, error} = await api.post('actualizar_estados');
    return {data, error};
    }
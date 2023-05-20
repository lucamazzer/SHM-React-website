import api from "@/api/api"

export const eraseSD = async () => {
    const {data, error} = await api.post('borrar_SD');
    return {data, error};
    }

export const downloadFiles = async () => {
    const {data, error} = await api.post('Descargar_datos');
    return {data, error};
    }
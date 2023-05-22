import api from '@/api/api'

export const eraseSD = async () => {
  const { data, error } = await api.post('borrar_SD')
  return { data, error }
}

export const downloadFiles = async () => {
  const { data, error } = await api.get('download_files')
  return { data, error }
}

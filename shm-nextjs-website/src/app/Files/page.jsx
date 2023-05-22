'use client'
import { Button } from '@mui/material'

import api, { API_URL } from '@/api/api'
import { downloadFiles } from '@/Services/Data.api'

export default function FilesPage () {
  const downloadAllFiles = async () => {
    const { data, error } = await downloadFiles()
    if (error) {
      console.log(error)
    }
    api.get('datos/downloads/mediciones.zip')
  }

  return (
    <div className='w-full h-full'>
         <h1 className="text-center text-4xl"> DATOS CAPTURADOS</h1>
         <iframe className='w-full !h-full mt-10' src={`${API_URL}mediciones`} title="Archivos de mediciones"></iframe>
         <Button className='!text-blue-500 !mt-5 !bg-white' onClick={downloadAllFiles}>Descargar todo</Button>
    </div>
  )
}

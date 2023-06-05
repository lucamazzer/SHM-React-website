'use client';
import { Button } from '@mui/material';

import { API_URL } from '@/api/api';
import { downloadFiles } from '@/Services/Data.api';

export default function FilesPage() {
  return (
    <div className="w-full h-full bg-gray-200 p-5">
      <h1 className="text-center text-4xl">DATOS CAPTURADOS</h1>
      <Button
        className="!mt-5 bg-primary hover:bg-blue-700"
        variant="contained"
        onClick={downloadFiles}>
        Descargar todo
      </Button>
      <iframe
        className="w-full  mt-10"
        src={`${API_URL}/datos/mediciones`}
        title="Archivos de mediciones"
      />
    </div>
  );
}

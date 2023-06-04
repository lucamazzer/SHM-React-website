'use client';
import { Button } from '@mui/material';

import { API_URL } from '@/api/api';
import { downloadFiles } from '@/Services/Data.api';

export default function FilesPage() {
  return (
    <div className="w-full h-full">
      <h1 className="text-center text-4xl"> DATOS CAPTURADOS</h1>
      <iframe
        className="w-full !h-full mt-10"
        src={`http://localhost/files`}
        title="Archivos de mediciones"></iframe>
      <Button
        className="!text-blue-500 !mt-5 !bg-white"
        onClick={downloadFiles}>
        Descargar todo
      </Button>
    </div>
  );
}

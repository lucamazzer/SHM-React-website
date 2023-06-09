'use client';
import { Button } from '@mui/material';

import { HOST_NAME } from '@/api/api';
import { downloadFiles } from '@/Services/Data.api';

export default function FilesPage() {
  return (
    <div className="flex  flex-col w-full h-full bg-gray-200 p-5">
      <h1 className="text-center text-4xl">DATOS CAPTURADOS</h1>
      <Button
        className="!mt-5 bg-primary hover:bg-blue-700 w-fit	"
        variant="contained"
        onClick={downloadFiles}>
        Descargar todo
      </Button>

      <iframe
        className="flex flex-col flex-1 mt-10"
        src={`http://${HOST_NAME}/files`}
        title="Archivos de mediciones"
      />
    </div>
  );
}

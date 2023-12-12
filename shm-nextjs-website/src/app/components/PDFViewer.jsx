'use client';

import { useState } from 'react';
// Import Worker
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import Loader from './Loader';
import MySelect from './MySelect';

import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

function PDFViewer() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [pdfFile, setPdfFile] = useState('/manual_web.pdf');

  const fileOptions = [
    { value: '/manual_web.pdf', label: 'Manual de la Web' },
    {
      value: '/manual_nodo_acelerometro.pdf',
      label: 'Manual nodo acelerometro',
    },
    {
      value: '/manual_nodo_concentrador.pdf',
      label: 'Manual nodo concentrador',
    },
  ];

  function onFileChange(event) {
    setPdfFile(event.target.value);
  }

  const workerUrl = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

  return (
    <div className="flex flex-col p-5 mt-5 items-center justify-center bg-gray-200 border-2 border-primary rounded-2xl">
      <div className="flex">
        <MySelect
          options={fileOptions}
          title={'Manual'}
          color="primary"
          value={pdfFile}
          onChange={onFileChange}
        />
      </div>
      <div className="flex w-full items-center justify-center">
        {pdfFile && (
          <Worker workerUrl={workerUrl}>
            <Viewer
              fileUrl={pdfFile}
              // plugins={[defaultLayoutPluginInstance]}
              renderLoader={() => (
                <div className="flex w-full items-center justify-center">
                  <Loader loading={true} color="primary" />
                </div>
              )}
            />
          </Worker>
        )}
      </div>
    </div>
  );
}

export default PDFViewer;

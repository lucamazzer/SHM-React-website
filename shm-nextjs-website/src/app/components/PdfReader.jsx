'use client';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import Loader from './Loader';
// import pdf from '../../../public/sample.pdf'
import MySelect from './MySelect';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.js');
// // require('pdfjs-dist/build/pdf.worker.min.js');
// //   'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

export default function PDFViewer() {
  const [file, setFile] = useState('/sample.pdf');

  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const fileOptions = [
    { value: '/sample.pdf', label: 'sample.pdf' },
    { value: '/sample2.pdf', label: 'sample2.pdf' },
  ];
  useEffect(() => {
    setLoading(true);
    console.log('file', file);
  }, [file]);

  function onFileChange(event) {
    setLoading(true);
    setFile(event.target.value);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
    setLoading(false);
  }

  return (
    <div className="flex flex-col p-5 mt-5 items-center justify-center bg-gray-200 border-2 border-primary rounded-2xl">
      <div className="flex">
        <MySelect
          options={fileOptions}
          title={'Seleccione un archivo'}
          color="primary"
          value={file}
          onChange={onFileChange}
        />
      </div>
      <div className="flex w-full bg-black">
        <div className="flex items-center mt-10">
          <Loader loading={loading} color="primary" />
        </div>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col w-full items-center">
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              className="flex flex-col w-full"
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}

// import dynamic from 'next/dynamic';

import PDFViewer from '../components/PDFViewer';

// import PDFViewer from '../components/PdfReader';

// const PDFViewer = dynamic(() => import('../components/PdfReader'), {
//   ssr: false,
// });

export default function AboutPage() {
  return (
    <div className="h-full p-5 bg-gray-300 overflow-auto shrink-0">
      <h1 className="text-center text-4xl">INSTRUCCIONES</h1>
      <PDFViewer />
      {/* <PDFViewer /> */}
    </div>
  );
}

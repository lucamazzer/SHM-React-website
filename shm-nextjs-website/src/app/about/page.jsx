import PDFViewer from '../components/PDFViewer';

export default function AboutPage() {
  return (
    <div className="h-full p-5 bg-gray-300 overflow-auto shrink-0">
      <h1 className="text-center text-4xl">INSTRUCCIONES</h1>
      <PDFViewer />
    </div>
  );
}

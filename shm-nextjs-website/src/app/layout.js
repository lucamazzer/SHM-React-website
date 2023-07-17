import { Toaster } from 'react-hot-toast';

import Navigation from './components/Navigation';
import { Providers } from './providers';

import '../styles/globals.css';

export const metadata = {
  title: 'SHM',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>SHM</title>
      </head>

      <body className="flex h-full">
        <Navigation />
        <div className="bg-blue-700 w-1" />
        <Providers>
          <div className="flex flex-col h-full w-full ">{children}</div>
        </Providers>
        <div>
          <div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
      </body>
    </html>
  );
}

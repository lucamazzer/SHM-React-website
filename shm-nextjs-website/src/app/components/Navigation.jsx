import Link from 'next/link';

const links = [
  { route: '/', label: 'Home' },
  { route: '/Information', label: 'Estado' },
  { route: '/Messures', label: 'Mediciones' },
  { route: '/Files', label: 'Archivos' },
  { route: '/Graphics', label: 'Graficos' },
  { route: '/Configuration', label: 'Configuration' },
  { route: '/about', label: 'Instrucciones' },
];

export default function Navigation() {
  return (
    <header className="flex item-center flex-col">
      {links.map(({ route, label }) => (
        <div key={`${route}${label}`} className="flex item-center w-full">
          <Link
            href={route}
            className="flex w-full text-gray-200 bg-primary hover:bg-white hover:text-black p-5">
            {label}
          </Link>
        </div>
      ))}
    </header>
  );
}

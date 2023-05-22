import Link from 'next/link'

const links = [
  { route: '/', label: 'Home' },
  { route: '/Information', label: 'Estado de nodos' },
  { route: '/Messures', label: 'Mediciones' },
  { route: '/Files', label: 'Archivos' },
  { route: '/Graphics', label: 'Graficos' },
  { route: '/Configuration', label: 'Configuration' },
  { route: '/about', label: 'About' }
]

export default function Navigation () {
  return (
    <header className="w-full flex item-center">
      {links.map(({ route, label }) => (
        <div
          key={`${route}${label}`}
          className="flex flex-1 justify-center"

        >
          <Link href={route} className="">
            {label}
          </Link>
        </div>
      ))}
    </header>
  )
}

import Link from 'next/link'

import styles from './Navigation.module.css'
const links = [
  { route: '/', label: 'Home' },
  { route: '/Information', label: 'Information' },
  { route: '/Messures', label: 'messures' },
  { route: '/Files', label: 'Files' },
  { route: '/Graphics', label: 'Graphics' },
  { route: '/Configuration', label: 'Configuration' },
  { route: '/about', label: 'About' }
]

export default function Navigation () {
  return (
      <header className={styles.header}>
        <nav className={styles.Navigation}>
         <ul>
          {links.map(({ route, label }) => (
            <li key={`${route}${label}`}>
              <Link href={route}>
                {label}
              </Link>
            </li>
          ))}
          </ul>
        </nav>
      </header>

  )
}

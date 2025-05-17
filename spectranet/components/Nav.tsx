'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'

const links = [
  { href: '/', label: 'Home' },
  { href: '/explorer', label: 'Explorer' },
  { href: '/upload', label: 'Upload' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/governance', label: 'Governance' },
  { href: '/api', label: 'API' },
]

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 backdrop-blur bg-neutral-900/50 flex items-center justify-between px-4 h-16">
      <Logo />
      <div className="flex gap-4">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-primary-400">
            {l.label}
          </Link>
        ))}
      </div>
      <ThemeToggle />
    </nav>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/svgComponents/Logo'

type NavLink = {
  label: string
  href: string
}

interface HeaderLinksProps {
  links?: NavLink[]
}

export default function HeaderLinks({
  links = [
    { label: 'Tutoriais', href: 'https://www.vlab.dc.ufscar.br/tutoriais/' },
    { label: 'Vlab', href: 'https://legacy.vlab.dc.ufscar.br/camera.php' },
    { label: 'Agenda', href: 'https://legacy.vlab.dc.ufscar.br/agenda/' },
    { label: 'Equipe', href: 'https://www.vlab.dc.ufscar.br/equipe.html' },
  ],
}: HeaderLinksProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`w-full flex items-center justify-between sm:justify-start absolute top-0 z-50 p-5 sm:p-12 ${menuOpen ? "bg-[#f8f7fc] sm:bg-transparent" : "bg-transparent"}`}>
      {/* Logo */}
      <div className="flex items-center mr-8">
        <Logo
          link="https://www.vlab.dc.ufscar.br"
          className="w-[48px] sm:w-[64px] aspect-square cursor-pointer text-roxo-300 transition duration-300 ease-in-out hover:text-roxo-900"
        />
      </div>

      <nav className="hidden sm:flex flex-row flex-wrap items-center gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-4 text-sm bg-[#f8f7fc] border border-roxo-300 text-roxo-300 rounded-full transition-all duration-300 hover:bg-roxo-300 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Botão mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden p-2 border border-roxo-500 rounded text-roxo-300 bg-[#f8f7fc] hover:text-roxo-900 transition-all duration-300 active:bg-[#d6cef5]"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#f8f7fc] shadow-md flex flex-col items-center pt-1 px-5 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-5 px-2 text-sm border-t border-[#d6cef5] text-roxo-300 active:bg-[#d6cef5]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

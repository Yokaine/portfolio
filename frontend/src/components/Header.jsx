import { useEffect, useState } from 'react'
import { site } from '../data/site.js'
import { useTheme } from '../hooks/useTheme.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { IconClose, IconDownload, IconMenu, IconMoon, IconSun } from './Icons.jsx'

const NAV = [
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
  { id: 'apropos', label: 'À propos' },
  { id: 'contact', label: 'Contact' },
]
const OBSERVED = ['top', ...NAV.map((item) => item.id)]

export default function Header() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(OBSERVED)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const cvUrl = `${import.meta.env.BASE_URL}${site.cvFile}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`header${scrolled || open ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="brand" onClick={close}>
          <span className="brand-mark" aria-hidden="true">{site.initials}</span>
          <span className="brand-name">{site.name}</span>
        </a>

        <nav id="main-nav" className={`nav${open ? ' is-open' : ''}`} aria-label="Navigation principale">
          <ul className="nav-list">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link${active === item.id ? ' is-active' : ''}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={close}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary nav-cv" href={cvUrl} download onClick={close}>
            <IconDownload />
            Télécharger mon CV
          </a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
            title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <a className="btn btn-secondary btn-sm header-cv" href={cvUrl} download>
            <IconDownload />
            CV
          </a>
          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
    </header>
  )
}

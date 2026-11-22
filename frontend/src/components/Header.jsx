import { site } from '../data/site.js'

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#top" className="brand">
          {site.name}
        </a>
        <nav aria-label="Navigation principale">
          <ul className="nav">
            <li><a href="#projets">Projets</a></li>
            <li><a href="#apropos">À propos</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

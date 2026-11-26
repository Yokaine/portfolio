import { site } from '../data/site.js'
import { Icon, IconArrowUp } from './Icons.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {site.name}
          <span className="footer-sep" aria-hidden="true">·</span>
          <span className="footer-built">Construit avec React, Symfony et Docker</span>
        </p>
        <div className="footer-links">
          {site.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
              <Icon name={s.icon} />
            </a>
          ))}
          <a href="#top" className="footer-top">
            Haut de page
            <IconArrowUp />
          </a>
        </div>
      </div>
    </footer>
  )
}

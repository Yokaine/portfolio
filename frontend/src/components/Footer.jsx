import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} {site.name}. Site construit avec React, Symfony et Docker.</p>
      </div>
    </footer>
  )
}

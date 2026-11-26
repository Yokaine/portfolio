import { site } from '../data/site.js'
import Reveal from './Reveal.jsx'
import { Icon, IconArrowRight, IconDownload } from './Icons.jsx'

export default function Hero() {
  const cvUrl = `${import.meta.env.BASE_URL}${site.cvFile}`

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <Reveal>
            <p className="status-badge">
              <span className="status-dot" aria-hidden="true" />
              {site.availability}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 id="hero-title" className="hero-title">{site.name}</h1>
            <p className="hero-role">{site.role}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="hero-intro">{site.intro}</p>
          </Reveal>
          <Reveal delay={180} className="hero-actions">
            <a className="btn btn-primary" href="#projets">
              Voir mes projets
              <IconArrowRight />
            </a>
            <a className="btn btn-secondary" href={cvUrl} download>
              <IconDownload />
              Télécharger mon CV
            </a>
          </Reveal>
          <Reveal delay={240}>
            <ul className="hero-socials">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    <Icon name={s.icon} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="hero-card">
          <p className="card-label">En bref</p>
          <dl className="facts">
            {site.highlights.map((item) => (
              <div key={item.label} className="fact">
                <dt>{item.label}</dt>
                <dd>
                  {item.value}
                  {item.detail && <span className="fact-detail">{item.detail}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

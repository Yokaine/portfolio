import { site } from '../data/site.js'

export default function Hero() {
  const cvUrl = `${import.meta.env.BASE_URL}${site.cvFile}`

  return (
    <section id="top" className="hero container">
      <p className="hero-status">
        <span className="dot" aria-hidden="true" />
        {site.availability}
      </p>
      <h1 className="hero-name">{site.name}</h1>
      <p className="hero-role">{site.role}</p>
      <p className="hero-intro">{site.intro}</p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#projets">Voir mes projets</a>
        <a className="btn" href={cvUrl} download>Télécharger mon CV</a>
      </div>
    </section>
  )
}

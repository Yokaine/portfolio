import { site } from '../data/site.js'

export default function About() {
  return (
    <section id="apropos" className="section container about">
      <h2>À propos</h2>
      <div className="about-grid">
        <div className="about-text">
          {site.about.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <dl className="skills">
          {Object.entries(site.skills).map(([group, items]) => (
            <div key={group} className="skills-group">
              <dt>{group}</dt>
              <dd>{items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

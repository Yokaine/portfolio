import { site } from '../data/site.js'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function About() {
  return (
    <section id="apropos" className="section" aria-labelledby="apropos-title">
      <div className="container">
        <SectionHeading id="apropos-title" index="03" eyebrow="À propos" title="Mon parcours" />

        <div className="about-grid">
          <Reveal className="about-text">
            {site.about.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Reveal>

          <Reveal delay={100} className="about-card">
            <p className="card-label">Formation</p>
            <ol className="timeline">
              {site.education.map((item) => (
                <li key={item.title} className={`timeline-item${item.current ? ' is-current' : ''}`}>
                  <div className="timeline-head">
                    <h3>{item.title}</h3>
                    {item.note && <span className="badge">{item.note}</span>}
                  </div>
                  <p>{item.school}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

import { site } from '../data/site.js'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { Icon } from './Icons.jsx'

export default function Skills() {
  return (
    <section id="competences" className="section" aria-labelledby="competences-title">
      <div className="container">
        <SectionHeading
          id="competences-title"
          index="02"
          eyebrow="Compétences"
          title="Les technologies que j'utilise"
          lead="Langages, frameworks et outils pratiqués en formation et sur mes projets."
        />

        <ul className="skills-grid">
          {site.skills.map((group, i) => (
            <Reveal as="li" key={group.group} delay={i * 70}>
              <article className="skill-card">
                <div className="skill-card-head">
                  <span className="skill-icon">
                    <Icon name={group.icon} />
                  </span>
                  <span className="skill-count">{String(group.items.length).padStart(2, '0')}</span>
                </div>
                <h3>{group.group}</h3>
                <ul className="tags">
                  {group.items.map((item) => (
                    <li key={item} className="tag">{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

import { useProjects } from '../hooks/useProjects.js'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { IconArrowUpRight, IconGithub } from './Icons.jsx'

function displayUrl(url) {
  try {
    const { host, pathname } = new URL(url)
    return `${host}${pathname}`.replace(/\/$/, '')
  } catch {
    return ''
  }
}

function ProjectCard({ project, index, total }) {
  const image = project.image ? `${import.meta.env.BASE_URL}${project.image}` : null
  const previewUrl = project.demo || project.code
  const MediaTag = previewUrl ? 'a' : 'div'
  const mediaProps = previewUrl
    ? { href: previewUrl, target: '_blank', rel: 'noreferrer', tabIndex: -1, 'aria-hidden': true }
    : {}

  return (
    <Reveal as="li">
      <article className="project-card">
        <MediaTag className="project-media" {...mediaProps}>
          <div className="browser-bar" aria-hidden="true">
            <span className="browser-dots"><i /><i /><i /></span>
            {project.demo && <span className="browser-url">{displayUrl(project.demo)}</span>}
          </div>
          <div className="project-shot">
            {image ? (
              <img src={image} alt={`Aperçu du projet ${project.title}`} loading="lazy" />
            ) : (
              <span className="project-placeholder" aria-hidden="true">
                {project.title.charAt(0)}
              </span>
            )}
          </div>
        </MediaTag>

        <div className="project-body">
          <p className="project-index">
            {String(index + 1).padStart(2, '0')}
            <span> / {String(total).padStart(2, '0')}</span>
          </p>
          <h3>{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          <ul className="tags" aria-label="Technologies utilisées">
            {project.stack.map((tech) => (
              <li key={tech} className="tag">{tech}</li>
            ))}
          </ul>
          {(project.demo || project.code) && (
            <div className="project-actions">
              {project.demo && (
                <a className="btn btn-primary btn-sm" href={project.demo} target="_blank" rel="noreferrer">
                  Voir la démo
                  <IconArrowUpRight />
                </a>
              )}
              {project.code && (
                <a className="btn btn-secondary btn-sm" href={project.code} target="_blank" rel="noreferrer">
                  <IconGithub />
                  Code source
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}

function ProjectSkeleton() {
  return (
    <li className="project-card is-loading" aria-hidden="true">
      <div className="project-media skeleton" />
      <div className="project-body">
        <span className="skeleton skeleton-line" style={{ width: '20%' }} />
        <span className="skeleton skeleton-title" />
        <span className="skeleton skeleton-line" />
        <span className="skeleton skeleton-line" />
        <span className="skeleton skeleton-line" style={{ width: '70%' }} />
      </div>
    </li>
  )
}

export default function Projects() {
  const { projects, status, retry } = useProjects()

  return (
    <section id="projets" className="section" aria-labelledby="projets-title">
      <div className="container">
        <SectionHeading
          id="projets-title"
          index="01"
          eyebrow="Projets"
          title="Projets sélectionnés"
          lead="Des applications web que j'ai conçues et développées, de l'interface jusqu'à la base de données."
        />

        {status === 'loading' && (
          <ul className="project-list" aria-busy="true">
            <ProjectSkeleton />
            <ProjectSkeleton />
          </ul>
        )}

        {status === 'error' && (
          <div className="notice" role="alert">
            <p>Les projets n'ont pas pu être chargés.</p>
            <button type="button" className="btn btn-secondary btn-sm" onClick={retry}>
              Réessayer
            </button>
          </div>
        )}

        {status === 'ready' && (
          <ul className="project-list">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} total={projects.length} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

import { useProjects } from '../hooks/useProjects.js'

function ProjectRow({ project }) {
  const image = project.image ? `${import.meta.env.BASE_URL}${project.image}` : null

  return (
    <li className="project">
      <div className="project-media">
        {image ? (
          <img src={image} alt={`Aperçu du projet ${project.title}`} loading="lazy" />
        ) : (
          <span className="project-placeholder" aria-hidden="true">
            {project.title.charAt(0)}
          </span>
        )}
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p className="project-stack">{project.stack.join(', ')}</p>
        <p className="project-links">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">Voir la démo</a>
          )}
          {project.code && (
            <a href={project.code} target="_blank" rel="noreferrer">Voir le code</a>
          )}
        </p>
      </div>
    </li>
  )
}

export default function Projects() {
  const { projects, status } = useProjects()

  return (
    <section id="projets" className="section container">
      <h2>Projets</h2>
      {status === 'loading' && <p className="muted">Chargement des projets…</p>}
      {status === 'error' && (
        <p className="muted">Les projets n'ont pas pu être chargés. Recharge la page dans un instant.</p>
      )}
      {status === 'ready' && (
        <ul className="projects">
          {projects.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </ul>
      )}
    </section>
  )
}

import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'

/** One project in the grid. On hover or keyboard focus it shows its buttons. */
export default function ProjectCard({ project, onEnlarge }) {
  const imageAlt = `Preview picture of the ${project.title} project`

  return (
    <Reveal as="li" className="project">
      <article className="card">
        <img className="card-media" src={project.image} width="1200" height="900" alt={imageAlt} loading="lazy" />
        <div className="card-overlay">
          <div className="card-text">
            <p className="card-cat">{project.category}</p>
            <h3 className="card-title">{project.title}</h3>
          </div>
          <div className="card-actions">
            <button
              type="button"
              className="pill-btn"
              aria-label={`Enlarge picture of ${project.title}`}
              onClick={() => onEnlarge({ src: project.image, alt: imageAlt, caption: project.title })}
            >
              <Icon name="zoom" size={18} />
              <span>Enlarge</span>
            </button>
            <Link className="pill-btn" to={`/projects/${project.slug}`} aria-label={`Read details of ${project.title}`}>
              <Icon name="link" size={18} />
              <span>Details</span>
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

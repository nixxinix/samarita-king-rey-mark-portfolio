import { Link } from 'react-router-dom'

/** "Previous project / Next project" links at the bottom of a details page. */
export default function ProjectPager({ previous, next }) {
  return (
    <nav className="pager" aria-label="More projects">
      <Link className="pager-prev" to={`/projects/${previous.slug}`} rel="prev">
        <span className="pager-label">Previous project</span>
        <span className="pager-title">{previous.title}</span>
      </Link>
      <Link className="pager-next" to={`/projects/${next.slug}`} rel="next">
        <span className="pager-label">Next project</span>
        <span className="pager-title">{next.title}</span>
      </Link>
    </nav>
  )
}

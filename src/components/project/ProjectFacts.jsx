import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'

/** The "Project information" box beside a project's write-up. */
export default function ProjectFacts({ project }) {
  return (
    <Reveal as="aside" className="facts" aria-labelledby="facts-title">
      <h2 id="facts-title">Project information</h2>
      <dl>
        <div>
          <dt>Category</dt>
          <dd>{project.category}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{project.date}</dd>
        </div>
        <div>
          <dt>My role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Tools</dt>
          <dd>{project.tools.join(', ')}</dd>
        </div>
      </dl>
      {project.liveUrl && <Button href={project.liveUrl}>View project</Button>}
      {project.codeUrl && (
        <Button href={project.codeUrl} variant="ghost">
          View code
        </Button>
      )}
    </Reveal>
  )
}

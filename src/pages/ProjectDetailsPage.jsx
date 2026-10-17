import { Link, useParams } from 'react-router-dom'
import PageBanner from '@/components/ui/PageBanner'
import Reveal from '@/components/ui/Reveal'
import ProjectFacts from '@/components/project/ProjectFacts'
import ProjectPager from '@/components/project/ProjectPager'
import NotFoundPage from '@/pages/NotFoundPage'
import { usePageMeta } from '@/hooks/usePageMeta'
import { projects, getProjectBySlug } from '@/data/projects'
import { site } from '@/data/site'

export default function ProjectDetailsPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  usePageMeta({
    title: project ? `${project.title} | ${site.name}` : `Project not found | ${site.name}`,
    description: project?.summary,
  })

  if (!project) return <NotFoundPage />

  const position = projects.indexOf(project)
  const previous = projects[(position - 1 + projects.length) % projects.length]
  const next = projects[(position + 1) % projects.length]

  return (
    <>
      <PageBanner title={project.title} crumb="Project Details" />
      <section className="section">
        <div className="container">
          <div className="detail">
            <div className="detail-main">
              <Reveal as="figure" className="detail-hero">
                <img src={project.image} width="1200" height="900" alt={`Main picture of the ${project.title} project`} />
              </Reveal>

              <Reveal className="detail-block">
                <h2>Overview</h2>
                <p>{project.overview}</p>
              </Reveal>
              <Reveal className="detail-block">
                <h2>The problem</h2>
                <p>{project.problem}</p>
              </Reveal>
              <Reveal className="detail-block">
                <h2>What I did</h2>
                <ol>
                  {project.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </Reveal>
              <Reveal className="detail-block">
                <h2>The result</h2>
                <p>{project.result}</p>
              </Reveal>
            </div>

            <ProjectFacts project={project} />
          </div>

          <ProjectPager previous={previous} next={next} />
          <p>
            <Link to={{ pathname: '/', hash: '#projects' }}>Back to all projects</Link>
          </p>
        </div>
      </section>
    </>
  )
}

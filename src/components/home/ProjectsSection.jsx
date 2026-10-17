import { useState } from 'react'
import ProjectCard from '@/components/home/ProjectCard'
import ProjectFilters from '@/components/home/ProjectFilters'
import Lightbox from '@/components/home/Lightbox'
import Reveal from '@/components/ui/Reveal'
import { projects } from '@/data/projects'

const ALL = 'All'
const categories = [ALL, ...new Set(projects.map((project) => project.category))]

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [enlarged, setEnlarged] = useState(null)

  const visibleProjects =
    activeCategory === ALL ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section className="section--tight" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <Reveal className="section-bar">
          <h2 id="projects-title">My projects</h2>
          <ProjectFilters categories={categories} active={activeCategory} onChange={setActiveCategory} />
        </Reveal>

        {/* Read out by screen readers when a filter is pressed. */}
        <p className="sr-only" role="status">
          Showing {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}
          {activeCategory === ALL ? '.' : ` in ${activeCategory}.`}
        </p>

        <ul className="grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} onEnlarge={setEnlarged} />
          ))}
        </ul>
      </div>

      <Lightbox item={enlarged} onClose={() => setEnlarged(null)} />
    </section>
  )
}

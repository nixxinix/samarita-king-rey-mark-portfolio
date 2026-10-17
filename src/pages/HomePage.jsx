import Hero from '@/components/home/Hero'
import ProjectsSection from '@/components/home/ProjectsSection'
import ToolsSection from '@/components/home/ToolsSection'
import SkillsSection from '@/components/home/SkillsSection'
import CertificationsSection from '@/components/home/CertificationsSection'
import { usePageMeta } from '@/hooks/usePageMeta'
import { site } from '@/data/site'

export default function HomePage() {
  usePageMeta({
    title: `${site.name} | Portfolio`,
    description: 'A simple portfolio showing projects, tools, skills and certificates.',
  })

  return (
    <>
      <Hero />
      <ProjectsSection />
      <ToolsSection />
      <SkillsSection />
      <CertificationsSection />
    </>
  )
}

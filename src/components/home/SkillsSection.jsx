import SectionHead from '@/components/ui/SectionHead'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import { skills } from '@/data/skills'

export default function SkillsSection() {
  return (
    <section className="section section--pb-sm" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title="Skills">
          What I do well, in plain words.
        </SectionHead>
        <ul className="grid">
          {skills.map((skill) => (
            <Reveal as="li" key={skill.title}>
              <div className="skill">
                <div className="skill-icon">
                  <Icon name={skill.icon} size={26} />
                </div>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

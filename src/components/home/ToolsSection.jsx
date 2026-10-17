import { useState } from 'react'
import SectionHead from '@/components/ui/SectionHead'
import Reveal from '@/components/ui/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { tools } from '@/data/tools'

function ToolList({ hidden = false }) {
  return (
    <ul className="marquee-list" aria-label={hidden ? undefined : 'Tools I use'} aria-hidden={hidden || undefined}>
      {tools.map((tool) => (
        <li className="chip" key={tool.name}>
          <span className="chip-mark" aria-hidden="true">
            {tool.mark}
          </span>
          {tool.name}
        </li>
      ))}
    </ul>
  )
}

/**
 * A slowly moving strip of tools. It pauses on hover or keyboard focus, has a
 * Pause button, and becomes a plain wrapped list when the visitor prefers
 * reduced motion.
 */
export default function ToolsSection() {
  const reducedMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const running = !reducedMotion

  return (
    <section className="section section--alt" id="tools" aria-labelledby="tools-title">
      <div className="container">
        <SectionHead id="tools-title" title="Tools">
          Software and tools I use when I build things.
        </SectionHead>
      </div>
      <Reveal className="container">
        <div className={`marquee${running ? ' is-running' : ''}${paused ? ' is-paused' : ''}`}>
          <div className="marquee-track">
            <ToolList />
            {running && <ToolList hidden />}
          </div>
        </div>
        {running && (
          <div className="marquee-controls">
            <button className="text-btn" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
              {paused ? 'Play moving tools' : 'Pause moving tools'}
            </button>
          </div>
        )}
      </Reveal>
    </section>
  )
}

import Reveal from '@/components/ui/Reveal'

/** Centered section title with a one-line description. */
export default function SectionHead({ id, title, children }) {
  return (
    <Reveal className="section-head">
      <h2 id={id}>{title}</h2>
      {children && <p className="lead">{children}</p>}
    </Reveal>
  )
}

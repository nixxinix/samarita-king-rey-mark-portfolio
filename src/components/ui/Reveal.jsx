import { useReveal } from '@/hooks/useReveal'

/**
 * Wrap anything in <Reveal> to make it rise gently into place, once, as it
 * scrolls into view.   <Reveal as="li" className="project">...</Reveal>
 */
export default function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const { ref, visible, delay } = useReveal()

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={`${className}${visible ? ' is-visible' : ''}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  )
}

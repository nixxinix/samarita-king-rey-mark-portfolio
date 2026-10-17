import Icon from '@/components/ui/Icon'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrolledPast } from '@/hooks/useScrolledPast'

export default function BackToTop() {
  const visible = useScrolledPast(480)
  const reducedMotion = useReducedMotion()

  return (
    <button
      className={`to-top${visible ? ' is-visible' : ''}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
    >
      <Icon name="up" size={22} />
    </button>
  )
}

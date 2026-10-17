import { useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Swipeable carousel built on native scrolling (scroll-snap), so touch, mouse
 * wheel, arrow keys and the buttons all work. It never moves on its own.
 */
export default function CertificateCarousel({ items }) {
  const viewportRef = useRef(null)
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  function readIndex() {
    const viewport = viewportRef.current
    if (!viewport.clientWidth) return 0
    return Math.round(viewport.scrollLeft / viewport.clientWidth)
  }

  function goTo(target) {
    const viewport = viewportRef.current
    const clamped = Math.max(0, Math.min(items.length - 1, target))
    viewport.scrollTo({ left: clamped * viewport.clientWidth, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(readIndex() + 1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(readIndex() - 1)
    }
  }

  return (
    <Reveal className="carousel" role="region" aria-roledescription="carousel" aria-label="Certifications">
      {/* The scrollable area is focusable so keyboard users can use the arrow keys. */}
      <div
        ref={viewportRef}
        className="carousel-viewport"
        tabIndex={0}
        onScroll={() => setIndex(readIndex())}
        onKeyDown={handleKeyDown}
      >
        <ul className="carousel-track">
          {items.map((item, i) => (
            <li
              key={item.id}
              className="slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
            >
              <img
                src={item.image}
                width="1200"
                height="850"
                alt={`Certificate picture: ${item.title} from ${item.issuer}`}
                loading="lazy"
              />
              <h3>{item.title}</h3>
              <p className="issuer">{item.issuer}</p>
              <blockquote>
                <p>{item.text}</p>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>

      <div className="carousel-controls">
        <button className="round-btn" type="button" aria-label="Previous certificate" disabled={index <= 0} onClick={() => goTo(index - 1)}>
          <Icon name="left" size={22} />
        </button>
        <div className="dots">
          {items.map((item, i) => (
            <button
              key={item.id}
              className="dot"
              type="button"
              aria-label={`Show certificate ${i + 1} of ${items.length}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          className="round-btn"
          type="button"
          aria-label="Next certificate"
          disabled={index >= items.length - 1}
          onClick={() => goTo(index + 1)}
        >
          <Icon name="right" size={22} />
        </button>
      </div>
    </Reveal>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// One shared observer for the whole page. Elements that scroll into view at the
// same moment are staggered a little, so a row of cards rises one after another.
const callbacks = new WeakMap()
let observer = null

function getObserver() {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      const showing = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left,
        )

      showing.forEach((entry, index) => {
        callbacks.get(entry.target)?.(Math.min(index, 4) * 90)
        observer.unobserve(entry.target)
        callbacks.delete(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
  )
  return observer
}

/**
 * Tells an element when to rise into view (once).
 * Returns a ref to attach, whether it is visible, and its stagger delay in ms.
 */
export function useReveal() {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const [state, setState] = useState({ visible: false, delay: 0 })

  const showImmediately = reducedMotion || typeof IntersectionObserver === 'undefined'

  useEffect(() => {
    const element = ref.current
    if (!element || showImmediately) return undefined

    callbacks.set(element, (delay) => setState({ visible: true, delay }))
    getObserver().observe(element)

    return () => {
      getObserver().unobserve(element)
      callbacks.delete(element)
    }
  }, [showImmediately])

  return {
    ref,
    visible: showImmediately || state.visible,
    delay: showImmediately ? 0 : state.delay,
  }
}

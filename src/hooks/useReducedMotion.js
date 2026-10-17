import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(callback) {
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

const getSnapshot = () => window.matchMedia(QUERY).matches

/** True when the visitor asked their device to reduce motion. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

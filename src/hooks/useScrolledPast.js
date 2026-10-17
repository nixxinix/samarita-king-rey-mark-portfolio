import { useCallback, useSyncExternalStore } from 'react'

/** True once the page has been scrolled further down than `threshold` pixels. */
export function useScrolledPast(threshold) {
  const subscribe = useCallback((callback) => {
    window.addEventListener('scroll', callback, { passive: true })
    return () => window.removeEventListener('scroll', callback)
  }, [])

  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  )
}

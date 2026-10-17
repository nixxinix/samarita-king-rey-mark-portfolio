import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Runs on every page change (it renders nothing):
 *  - scrolls to the top, or to the #section named in the link
 *  - moves keyboard focus to the page content, so screen reader and keyboard
 *    users start at the top of the new page instead of in the old menu
 */
export default function RouteEffects() {
  const { pathname, hash } = useLocation()
  const isFirstVisit = useRef(true)

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null

    if (target) {
      target.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    if (!isFirstVisit.current) {
      document.getElementById('main')?.focus({ preventScroll: true })
    }
    isFirstVisit.current = false
  }, [pathname, hash])

  return null
}

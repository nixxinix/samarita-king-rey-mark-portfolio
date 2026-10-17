import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import { navigation } from '@/data/navigation'

/** Slide-in menu from the left. Esc closes it, Tab stays inside it while open. */
export default function SideMenu({ open, onClose }) {
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    // Focus the X button when menu opens
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const items = panelRef.current.querySelectorAll('a[href], button:not([disabled])')
      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <>
      {/* Overlay hidden — no dim effect */}
      <div className="overlay" aria-hidden="true" />
      <nav
        ref={panelRef}
        className={`panel${open ? ' is-open' : ''}`}
        id="site-nav"
        aria-label="Main menu"
      >
        {/* X close button inside panel, top-left */}
        <button
          ref={closeButtonRef}
          className={`round-btn panel-close${open ? ' is-open' : ''}`}
          type="button"
          aria-label="Close menu"
          onClick={onClose}
        >
          <Icon name="close" size={22} />
        </button>

        <div className="panel-nav">
          <ul>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end onClick={onClose}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

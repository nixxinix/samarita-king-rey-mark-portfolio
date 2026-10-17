import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import SideMenu from '@/components/layout/SideMenu'
import { useScrolledPast } from '@/hooks/useScrolledPast'
import { site } from '@/data/site'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const menuButtonRef = useRef(null)
  const scrolled = useScrolledPast(8)
  const lastYRef = useRef(0)

  useEffect(() => {
    if (!menuOpen) return undefined

    const scrollY = window.scrollY
    const body = document.body
    const originalTop = body.style.top

    body.style.top = `-${scrollY}px`
    body.classList.add('no-scroll')

    return () => {
      body.classList.remove('no-scroll')
      body.style.top = originalTop
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
    }
  }, [menuOpen])

  // Hide header when scrolling down, reveal when scrolling up
  useEffect(() => {
    const headerHeight = 72

    function onScroll() {
      if (menuOpen) return
      const y = window.scrollY
      if (y > headerHeight && y > lastYRef.current) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastYRef.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  const openMenu = useCallback(() => {
    setHidden(false)
    setMenuOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus({ preventScroll: true })
  }, [])

  const classes = [
    'site-header',
    scrolled ? 'is-scrolled' : '',
    hidden ? 'is-hidden' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <header className={classes}>
        <div className="header-inner">
          <Link className="brand" to="/">
            {site.name}
          </Link>
          <button
            ref={menuButtonRef}
            className="menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label="Open menu"
            onClick={openMenu}
          >
            <Icon name="menu" size={28} />
          </button>
        </div>
      </header>

      <SideMenu open={menuOpen} onClose={closeMenu} />
    </>
  )
}

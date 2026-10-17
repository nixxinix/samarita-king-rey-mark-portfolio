import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import RouteEffects from '@/components/layout/RouteEffects'

/** The frame shared by every page: header, page content, footer. */
export default function Layout() {
  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <RouteEffects />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'

/** Gray title area at the top of inner pages, with a breadcrumb trail. */
export default function PageBanner({ title, crumb }) {
  return (
    <section className="page-banner">
      <div className="container">
        <Reveal as="h1">{title}</Reveal>
        <Reveal as="nav" className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-current="page">{crumb}</li>
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

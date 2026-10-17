import PageBanner from '@/components/ui/PageBanner'
import Button from '@/components/ui/Button'
import { usePageMeta } from '@/hooks/usePageMeta'
import { site } from '@/data/site'

export default function NotFoundPage() {
  usePageMeta({ title: `Page not found | ${site.name}` })

  return (
    <>
      <PageBanner title="Page not found" crumb="Not found" />
      <section className="section">
        <div className="container not-found">
          <p className="lead">We could not find the page you were looking for. It may have moved, or the link may have a typing mistake.</p>
          <Button to="/">Go to the home page</Button>
        </div>
      </section>
    </>
  )
}

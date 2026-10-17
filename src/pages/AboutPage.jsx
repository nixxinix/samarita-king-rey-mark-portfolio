import PageBanner from '@/components/ui/PageBanner'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { usePageMeta } from '@/hooks/usePageMeta'
import { site } from '@/data/site'

export default function AboutPage() {
  usePageMeta({
    title: `About | ${site.name}`,
    description: 'Learn more about me, my background and how to work with me.',
  })

  return (
    <>
      <PageBanner title="About" crumb="About" />
      <section className="section">
        <div className="container about">
          <Reveal className="about-photo">
            <img src="/images/profile.svg" width="800" height="1000" alt={`Portrait of ${site.name}`} />
          </Reveal>

          <div className="about-text">
            <Reveal>
              <h2>{site.name}</h2>
              <p className="about-role">{site.tagline}</p>
            </Reveal>

            <Reveal as="dl" className="info-list">
              <div>
                <dt>Location</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd>
                  <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
                    Profile<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>{site.availability}</dd>
              </div>
            </Reveal>

            <Reveal>
              {site.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Button to="/contact">Get in touch</Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

import PageBanner from '@/components/ui/PageBanner'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactForm from '@/components/contact/ContactForm'
import { usePageMeta } from '@/hooks/usePageMeta'
import { site } from '@/data/site'

export default function ContactPage() {
  usePageMeta({
    title: `Contact | ${site.name}`,
    description: 'Send me a message or find my email and location.',
  })

  return (
    <>
      <PageBanner title="Contact" crumb="Contact" />
      <section className="section">
        <div className="container contact">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </>
  )
}

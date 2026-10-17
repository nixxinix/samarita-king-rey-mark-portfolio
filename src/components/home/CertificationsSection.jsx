import SectionHead from '@/components/ui/SectionHead'
import CertificateCarousel from '@/components/home/CertificateCarousel'
import { certifications } from '@/data/certifications'

export default function CertificationsSection() {
  return (
    <section className="section section--pt-sm" id="certifications" aria-labelledby="certs-title">
      <div className="container">
        <SectionHead id="certs-title" title="Certifications">
          Courses I completed to keep learning. Swipe, or use the arrows, to see them all.
        </SectionHead>
        <CertificateCarousel items={certifications} />
      </div>
    </section>
  )
}

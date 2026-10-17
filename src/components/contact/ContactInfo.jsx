import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/data/site'

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <ul className="contact-list">
        <Reveal as="li" className="contact-item">
          <span className="contact-icon">
            <Icon name="pin" />
          </span>
          <div>
            <h3>Location</h3>
            <p>{site.location}</p>
          </div>
        </Reveal>
        <Reveal as="li" className="contact-item">
          <span className="contact-icon">
            <Icon name="phone" />
          </span>
          <div>
            <h3>Phone</h3>
            <p>If you would like a call back, please say so in your message.</p>
          </div>
        </Reveal>
        <Reveal as="li" className="contact-item">
          <span className="contact-icon">
            <Icon name="mail" />
          </span>
          <div>
            <h3>Email</h3>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </Reveal>
      </ul>
    </div>
  )
}

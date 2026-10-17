import Icon from '@/components/ui/Icon'
import { site } from '@/data/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <ul className="social">
          <li>
            <a href={site.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)">
              <Icon name="github" />
            </a>
          </li>
          <li>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
              <Icon name="linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

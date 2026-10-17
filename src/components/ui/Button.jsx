import { Link } from 'react-router-dom'

/**
 * One button style for everything.
 *   <Button to="/contact">Contact me</Button>          page link
 *   <Button href="https://...">View code</Button>      outside link (new tab)
 *   <Button type="submit">Send message</Button>        real button
 * Use variant="ghost" for the outlined style.
 */
export default function Button({ to, href, variant = 'solid', className = '', children, ...props }) {
  const classes = `btn${variant === 'ghost' ? ' btn--ghost' : ''}${className ? ` ${className}` : ''}`

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}

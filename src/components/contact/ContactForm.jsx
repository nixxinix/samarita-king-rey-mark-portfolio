import { useState } from 'react'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/data/site'

const EMPTY = { name: '', email: '', subject: '', message: '', _gotcha: '' }

// Clear, specific messages. Errors never blame the visitor.
function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address, like name@example.com.'
  }
  if (!values.message.trim()) errors.message = 'Please write a short message.'
  return errors
}

/**
 * Contact form with visible labels and accessible error messages.
 * Sends to the form service in VITE_CONTACT_ENDPOINT when it is set;
 * otherwise opens the visitor's email app with the message ready to send.
 */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ kind: '', text: '' })

  function handleChange(event) {
    const { name, value } = event.target
    const next = { ...values, [name]: value }
    setValues(next)
    // Once a field has an error, re-check it while the visitor types so the message disappears as soon as it is fixed.
    if (errors[name]) setErrors({ ...errors, [name]: validate(next)[name] })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus({ kind: '', text: '' })

    const found = validate(values)
    setErrors(found)
    const firstInvalid = ['name', 'email', 'message'].find((field) => found[field])
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      setStatus({ kind: 'error', text: 'Please fix the highlighted fields and try again.' })
      return
    }

    // Hidden spam trap: real people never fill this in.
    if (values._gotcha) return

    if (site.contactEndpoint) {
      setStatus({ kind: '', text: 'Sending your message...' })
      try {
        const response = await fetch(site.contactEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (!response.ok) throw new Error('Request failed')
        setValues(EMPTY)
        setStatus({ kind: 'success', text: 'Thank you. Your message was sent.' })
      } catch {
        setStatus({ kind: 'error', text: 'Sorry, the message could not be sent. Please email me directly instead.' })
      }
      return
    }

    const body = `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`
    window.location.href =
      `mailto:${site.email}?subject=${encodeURIComponent(values.subject.trim() || 'Message from my portfolio')}` +
      `&body=${encodeURIComponent(body)}`
    setStatus({ kind: 'success', text: 'Your email app should open with the message ready to send.' })
  }

  return (
    <Reveal as="form" className="form" noValidate onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
          />
          {errors.name && (
            <p className="field-error" id="error-name">
              {errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
          />
          {errors.email && (
            <p className="field-error" id="error-email">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="subject">
          Subject <span className="hint">(optional)</span>
        </label>
        <input id="subject" name="subject" type="text" value={values.subject} onChange={handleChange} />
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
        />
        {errors.message && (
          <p className="field-error" id="error-message">
            {errors.message}
          </p>
        )}
      </div>

      <div className="hp" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={values._gotcha} onChange={handleChange} />
        </label>
      </div>

      <div className="form-actions">
        <Button type="submit">Send message</Button>
        <p className={`form-status${status.kind ? ` is-${status.kind}` : ''}`} role="status">
          {status.text}
        </p>
      </div>
    </Reveal>
  )
}

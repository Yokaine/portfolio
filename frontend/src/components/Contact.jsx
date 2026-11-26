import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site.js'
import Reveal from './Reveal.jsx'
import { Icon, IconArrowUpRight, IconCheck, IconCopy, IconDownload, IconMail } from './Icons.jsx'

const API = import.meta.env.VITE_API_URL

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <button type="button" className="btn btn-secondary" onClick={copy}>
      {copied ? <IconCheck /> : <IconCopy />}
      <span aria-live="polite">{copied ? 'Adresse copiée' : "Copier l'adresse"}</span>
    </button>
  )
}

function ContactLinks() {
  const cvUrl = `${import.meta.env.BASE_URL}${site.cvFile}`
  const links = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: <IconMail /> },
    ...site.socials.map((s) => ({
      label: s.label,
      value: s.handle,
      href: s.url,
      icon: <Icon name={s.icon} />,
      external: true,
    })),
    { label: 'CV', value: 'Télécharger le PDF', href: cvUrl, icon: <IconDownload />, download: true },
  ]

  return (
    <ul className="contact-links">
      {links.map((link) => (
        <li key={link.label}>
          <a
            className="contact-link"
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            {...(link.download ? { download: true } : {})}
          >
            <span className="contact-link-icon">{link.icon}</span>
            <span className="contact-link-text">
              <span className="contact-link-label">{link.label}</span>
              <span className="contact-link-value">{link.value}</span>
            </span>
            <IconArrowUpRight className="contact-link-arrow" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    setStatus('sending')
    setError('')

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || "Le message n'a pas pu être envoyé.")
      form.reset()
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="field">
          <span>Nom</span>
          <input name="name" type="text" required maxLength={100} autoComplete="name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={5} required minLength={10} maxLength={2000} />
      </label>
      <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="form-footer">
        <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
        </button>
        <p role="status" aria-live="polite" className={`form-status ${status}`}>
          {status === 'success' && 'Message envoyé. Je te réponds dès que possible.'}
          {status === 'error' && error}
        </p>
      </div>
    </form>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact-panel">
          <div className="contact-intro">
            <p className="eyebrow">
              <span className="eyebrow-index">04</span>
              <span className="eyebrow-rule" aria-hidden="true" />
              Contact
            </p>
            <h2 id="contact-title">Un stage, une alternance ou une question&nbsp;?</h2>
            <p className="contact-lead">
              Le plus simple est de m'écrire par email : je réponds dès que possible. Je suis aussi
              joignable sur LinkedIn.
            </p>
            <div className="contact-actions">
              <a className="btn btn-primary" href={`mailto:${site.email}`}>
                <IconMail />
                Envoyer un email
              </a>
              <CopyEmailButton />
            </div>
          </div>

          {API ? <ContactForm /> : <ContactLinks />}
        </Reveal>
      </div>
    </section>
  )
}

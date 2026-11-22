import { useState } from 'react'
import { site } from '../data/site.js'

const API = import.meta.env.VITE_API_URL

export default function Contact() {
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
    <section id="contact" className="section container">
      <h2>Contact</h2>
      <div className="contact-grid">
        <div>
          <p>
            Un stage, une alternance ou une question sur un projet ? Écris-moi à{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <ul className="socials">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {API && (
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Nom
              <input name="name" type="text" required maxLength={100} autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} required minLength={10} maxLength={2000} />
            </label>
            <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
            </button>

            <p role="status" aria-live="polite" className={`form-status ${status}`}>
              {status === 'success' && 'Message envoyé. Je te réponds dès que possible.'}
              {status === 'error' && error}
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

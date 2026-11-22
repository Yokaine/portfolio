import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL
const STATIC_FILE = `${import.meta.env.BASE_URL}projects.json`

function load(url) {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(res.status)
    return res.json()
  })
}

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false
    const request = API
      ? load(`${API}/api/projects`).catch(() => load(STATIC_FILE))
      : load(STATIC_FILE)

    request
      .then((data) => {
        if (ignore) return
        setProjects(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!ignore) setStatus('error')
      })

    return () => {
      ignore = true
    }
  }, [])

  return { projects, status }
}

// GoatCounter event tracking. Events appear in the dashboard as paths like "cv-download".
// Dashboard: https://mohammad-akram.goatcounter.com
import { aiProjects, profile } from './data'

declare global {
  interface Window {
    goatcounter?: { count: (opts: { path: string; title?: string; event?: boolean }) => void }
  }
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function track(event: string, title = event) {
  window.goatcounter?.count({ path: event, title, event: true })
}

/** Map a link destination to an event name, or null if it isn't one we care about. */
export function eventForHref(href: string): string | null {
  if (href.endsWith(profile.cv)) return 'cv-download'
  const agent = aiProjects.find((p) => href.startsWith(p.url.replace(/\/$/, '')))
  if (agent) return `live-agent-${slug(agent.name)}`
  if (href.startsWith(profile.github)) return 'github'
  if (href.startsWith(profile.linkedin)) return 'linkedin'
  if (href.startsWith('mailto:')) return 'email'
  return null
}

/** One listener for the whole page: counts clicks on CV, live agent, GitHub and email links. */
export function initClickTracking() {
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null
      if (!a) return
      const ev = eventForHref(a.getAttribute('href') || '')
      if (ev) track(ev)
    },
    { capture: true },
  )
}

import { useEffect, useState } from 'react'
import { apiGet } from '../../api/client'
import {
  RECONNECT_DONE_EVENT,
  needsReconnect,
  requestClaudeReconnect,
} from './claudeReconnect'
import type { ReconnectStatus } from './claudeReconnect'
import './ReconnectClaudeButton.css'

export const RECONNECT_POLL_MS = 60_000

/**
 * Reconnect Claude (t3775). Shown whenever Claude is signed out, or signed in on
 * a credential that cannot renew itself. It signs nothing out and moves no
 * files: it only asks the sign-in dialog to open, and the dialog starts the
 * owner's own sign-in (in a separate window when an AI is running).
 */
export function ReconnectClaudeButton() {
  const [needed, setNeeded] = useState(false)

  useEffect(() => {
    let cancelled = false
    const check = () => {
      apiGet<ReconnectStatus>('/api/auth/status')
        .then(s => { if (!cancelled) setNeeded(needsReconnect(s)) })
        .catch(() => { /* keep the last answer on a transient error */ })
    }
    check()
    const id = setInterval(check, RECONNECT_POLL_MS)
    window.addEventListener(RECONNECT_DONE_EVENT, check)
    return () => {
      cancelled = true
      clearInterval(id)
      window.removeEventListener(RECONNECT_DONE_EVENT, check)
    }
  }, [])

  if (!needed) return null
  return (
    <button
      type="button"
      className="reconnect-claude-btn"
      onClick={requestClaudeReconnect}
      title="Sign your AI in to Claude again"
    >
      Reconnect Claude
    </button>
  )
}

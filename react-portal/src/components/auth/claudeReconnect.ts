/** Reconnect Claude (t3775): the button asks the sign-in dialog to open. */
export const RECONNECT_CLAUDE_EVENT = 'youraiciv:reconnect-claude'
/** Fired by the dialog after a sign-in finished, so the button re-reads status. */
export const RECONNECT_DONE_EVENT = 'youraiciv:reconnect-claude-done'

/** Shape of GET /api/auth/status as the Reconnect button reads it. */
export interface ReconnectStatus {
  authenticated: boolean
  managed?: boolean
  /** The credential can renew itself (a refresh token exists). */
  refreshable?: boolean
  /** Signed out, or signed in on a credential that cannot renew itself. */
  reconnect_needed?: boolean
}

export function requestClaudeReconnect(): void {
  window.dispatchEvent(new CustomEvent(RECONNECT_CLAUDE_EVENT))
}

/** True when the owner should be offered Reconnect Claude. Fails closed (no button) on odd data. */
export function needsReconnect(s: ReconnectStatus | null | undefined): boolean {
  if (!s || s.managed === true) return false
  if (typeof s.reconnect_needed === 'boolean') return s.reconnect_needed
  return s.authenticated === false
}

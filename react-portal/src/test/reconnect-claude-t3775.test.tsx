import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ClaudeAuthFlow } from '../components/auth/ClaudeAuthFlow'
import { ReconnectClaudeButton } from '../components/auth/ReconnectClaudeButton'
import { needsReconnect } from '../components/auth/claudeReconnect'

type Json = Record<string, unknown>
let statuses: Json[] = []
let startBody: Json = {}
let codeBody: Json = {}
let calls: string[] = []

beforeEach(() => {
  calls = []
  vi.stubGlobal('fetch', vi.fn(async (url: string, opts: RequestInit = {}) => {
    const u = String(url)
    calls.push(`${(opts.method || 'GET').toUpperCase()} ${u}`)
    let body: Json = {}
    if (u === '/api/auth/status') body = statuses.length > 1 ? statuses.shift()! : statuses[0]
    else if (u === '/api/auth/start') body = startBody
    else if (u === '/api/auth/code') body = codeBody
    else body = { status: 'fired' }
    return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }))
})
afterEach(() => { vi.unstubAllGlobals() })

const URL = 'https://claude.ai/oauth/authorize?code=true&state=helper1'

describe('needsReconnect', () => {
  it('true when reconnect_needed, false when not', () => {
    expect(needsReconnect({ authenticated: true, reconnect_needed: true })).toBe(true)
    expect(needsReconnect({ authenticated: true, reconnect_needed: false })).toBe(false)
  })
  it('falls back to signed-out when the server does not send the flag', () => {
    expect(needsReconnect({ authenticated: false })).toBe(true)
    expect(needsReconnect({ authenticated: true })).toBe(false)
  })
  it('never for a managed engine or an unknown answer', () => {
    expect(needsReconnect({ authenticated: false, managed: true, reconnect_needed: true })).toBe(false)
    expect(needsReconnect(null)).toBe(false)
  })
})

describe('Reconnect Claude button (t3775)', () => {
  it('is hidden while Claude is signed in and can renew itself', async () => {
    statuses = [{ authenticated: true, refreshable: true, reconnect_needed: false }]
    render(<ReconnectClaudeButton />)
    await waitFor(() => expect(calls).toContain('GET /api/auth/status'))
    expect(screen.queryByText('Reconnect Claude')).not.toBeInTheDocument()
  })

  it('shows when signed out, and a click starts nothing by itself', async () => {
    statuses = [{ authenticated: false, refreshable: false, reconnect_needed: true }]
    render(<ReconnectClaudeButton />)
    expect(await screen.findByText('Reconnect Claude')).toBeInTheDocument()
    expect(calls.filter(c => c.startsWith('POST'))).toEqual([])
  })

  it('shows when signed in on a credential that cannot renew', async () => {
    statuses = [{ authenticated: true, refreshable: false, reconnect_needed: true }]
    render(<ReconnectClaudeButton />)
    expect(await screen.findByText('Reconnect Claude')).toBeInTheDocument()
  })

  it('a status error leaves it hidden', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('boom', { status: 500 })))
    render(<ReconnectClaudeButton />)
    await new Promise(r => setTimeout(r, 50))
    expect(screen.queryByText('Reconnect Claude')).not.toBeInTheDocument()
  })
})

describe('Reconnect Claude dialog (t3775)', () => {
  it('opens even though the portal reports signed in, signs in via the helper, never fires first boot', async () => {
    statuses = [
      { authenticated: true, refreshable: false, reconnect_needed: true, live_session: true, signin_mode: 'helper' },
    ]
    startBody = { started: true, url: URL, mode: 'helper' }
    codeBody = { injected: true, mode: 'helper', result: 'signed_in' }
    render(<><ReconnectClaudeButton /><ClaudeAuthFlow /></>)
    fireEvent.click(await screen.findByText('Reconnect Claude', { selector: 'button.reconnect-claude-btn' }))
    // dialog stays open (is not dismissed as "already authenticated") and offers the owner's sign-in
    fireEvent.click(await screen.findByText('Sign in'))
    expect(await screen.findByText('Open Claude Authorization Page')).toHaveAttribute('href', URL)
    fireEvent.change(screen.getByPlaceholderText('eyJh...'), { target: { value: 'abc#def' } })
    fireEvent.click(screen.getByText('Submit'))
    await waitFor(() => expect(calls).toContain('POST /api/auth/code'), { timeout: 10000 })
    expect(calls.filter(c => c.startsWith('POST'))).toEqual(['POST /api/auth/start', 'POST /api/auth/code'])
    expect(calls).not.toContain('POST /api/evolution/first-boot')
  }, 15000)

  it('negative control: nothing is started or fired without the click', async () => {
    statuses = [{ authenticated: true, refreshable: false, reconnect_needed: true }]
    render(<><ReconnectClaudeButton /><ClaudeAuthFlow /></>)
    await screen.findByText('Reconnect Claude')
    await new Promise(r => setTimeout(r, 100))
    expect(calls.filter(c => c.startsWith('POST'))).toEqual([])
  })

  it('stays open while the server still says reconnect is needed', async () => {
    statuses = [{ authenticated: true, refreshable: false, reconnect_needed: true, signin_mode: 'helper' }]
    startBody = { started: true, url: URL, mode: 'helper' }
    render(<><ReconnectClaudeButton /><ClaudeAuthFlow /></>)
    fireEvent.click(await screen.findByText('Reconnect Claude', { selector: 'button.reconnect-claude-btn' }))
    fireEvent.click(await screen.findByText('Sign in'))
    await screen.findByText('Open Claude Authorization Page')
    await new Promise(r => setTimeout(r, 3500))
    expect(screen.getByText('Open Claude Authorization Page')).toBeInTheDocument()
  }, 15000)
})

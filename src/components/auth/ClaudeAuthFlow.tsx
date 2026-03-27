import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiGet, apiPost } from '../../api/client'
import { fireFirstBoot } from '../../api/evolution'
import './ClaudeAuthFlow.css'

interface AuthStatus {
  authenticated: boolean
  account: string | null
  expires_at: number | null
  needs_human_auth?: boolean
}

type FlowStep = 'idle' | 'starting' | 'polling_url' | 'waiting_code' | 'submitting'

export function ClaudeAuthFlow() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<AuthStatus | null>(null)
  const [step, setStep] = useState<FlowStep>('idle')
  const [oauthUrl, setOauthUrl] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchStatus = async () => {
    try {
      const s = await apiGet<AuthStatus>('/api/auth/status')
      setStatus(s)
      return s
    } catch {
      return null
    }
  }

  useEffect(() => {
    fetchStatus()
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [])

  const startAuth = async () => {
    setError(null)
    setStep('starting')
    try {
      await apiPost('/api/auth/start')
      setStep('polling_url')
      pollRef.current = setInterval(async () => {
        try {
          const res = await apiGet<{ url?: string; ready: boolean }>('/api/auth/url')
          if (res.ready && res.url) {
            clearInterval(pollRef.current!)
            setOauthUrl(res.url)
            setStep('waiting_code')
          }
        } catch {
          // keep polling
        }
      }, 2000)
    } catch {
      setError('Failed to start auth flow. Is Claude running in tmux?')
      setStep('idle')
    }
  }

  const submitCode = async () => {
    if (!code.trim()) return
    setStep('submitting')
    setError(null)
    try {
      await apiPost('/api/auth/code', { code: code.trim() })
      // Poll status until authenticated, then fire evolution.
      // Important: do NOT call fetchStatus() (which sets status.authenticated
      // and causes the component to self-dismiss) until after evolution fires
      // and we've navigated to the terminal view.
      pollRef.current = setInterval(async () => {
        try {
          const s = await apiGet<AuthStatus>('/api/auth/status')
          if (s?.authenticated) {
            clearInterval(pollRef.current!)
            // Fire evolution in background — do NOT await. The server-side
            // endpoint takes 30-45s (kills /login Claude, starts new Claude,
            // waits for it, injects prompt). Awaiting it would block the
            // overlay on screen the entire time.
            fireFirstBoot().catch(() => {
              // Server handles retry/error. Nothing the UI can do here.
            })
            // Dismiss overlay immediately and show terminal
            navigate('/terminal')
            setStatus(s)
          }
        } catch {
          // keep polling
        }
      }, 2000)
    } catch {
      setError('Failed to submit code. Try again.')
      setStep('waiting_code')
    }
  }

  // Not yet loaded or already authenticated
  if (!status || status.authenticated) return null

  return (
    <div className="claude-auth-overlay">
      <div className="claude-auth-card">
        <div className="claude-auth-header">
          <h2 className="claude-auth-title">Claude Authentication Required</h2>
          <p className="claude-auth-subtitle">
            Claude Code needs to authenticate with Anthropic before you can chat.
          </p>
        </div>

        {error && <p className="claude-auth-error">{error}</p>}

        {step === 'idle' && (
          <button className="claude-auth-btn" onClick={startAuth}>
            Start Auth
          </button>
        )}

        {step === 'starting' && (
          <p className="claude-auth-status">Starting auth flow in Claude tmux session...</p>
        )}

        {step === 'polling_url' && (
          <p className="claude-auth-status">Waiting for OAuth URL from Claude... (this takes ~5s)</p>
        )}

        {step === 'waiting_code' && oauthUrl && (
          <div className="claude-auth-code-step">
            <p className="claude-auth-instruction">
              1. Open this link and log in with your Anthropic account:
            </p>
            <a
              className="claude-auth-link"
              href={oauthUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Anthropic Login
            </a>
            <p className="claude-auth-instruction">
              2. After logging in, paste the authorization code below:
            </p>
            <input
              className="claude-auth-input"
              type="text"
              placeholder="Paste authorization code..."
              value={code}
              onChange={e => setCode(e.target.value)}
              autoFocus
            />
            <button
              className="claude-auth-btn"
              onClick={submitCode}
              disabled={!code.trim()}
            >
              Submit Code
            </button>
          </div>
        )}

        {step === 'submitting' && (
          <p className="claude-auth-status">Submitting code... verifying with Anthropic...</p>
        )}
      </div>
    </div>
  )
}

import { useEffect, useRef, useState, useCallback, type FormEvent, type KeyboardEvent } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useGroupChatStore } from '../../stores/groupChatStore'
import { LoadingSpinner } from '../common/LoadingSpinner'
import { EmptyState } from '../common/EmptyState'
import { cn } from '../../utils/cn'
import type { HubPost } from '../../types/hub'
import './GroupChatView.css'

/* ── Constants ───────────────────────────────────────── */

const ACG_ENTITY_ID = 'c537633e-13b3-5b33-82c6-d81a12cfbbf0'

/* ── Author detection ────────────────────────────────── */

type Author = 'corey' | 'acg' | 'root' | 'unknown'

interface ParsedMessage {
  author: Author
  displayName: string
  body: string
}

function parseMessage(post: HubPost): ParsedMessage {
  const raw = post.body || post.properties?.body || ''

  // Check for prefix tags
  if (raw.startsWith('[Corey] ')) {
    return { author: 'corey', displayName: 'Corey', body: raw.slice(8) }
  }
  if (raw.startsWith('[Root] ')) {
    return { author: 'root', displayName: 'Root', body: raw.slice(7) }
  }
  if (raw.startsWith('[ACG] ')) {
    return { author: 'acg', displayName: 'ACG', body: raw.slice(6) }
  }

  // Fall back to entity ID
  if (post.created_by === ACG_ENTITY_ID) {
    return { author: 'acg', displayName: 'ACG', body: raw }
  }

  return { author: 'unknown', displayName: post.created_by?.slice(0, 8) || '???', body: raw }
}

function timeAgo(iso?: string): string {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

/* ── Message Bubble ──────────────────────────────────── */

function GroupMessageBubble({ post }: { post: HubPost }) {
  const { author, displayName, body } = parseMessage(post)
  const isCorey = author === 'corey'

  return (
    <div className={cn('gc-msg-row', isCorey && 'gc-msg-row-right')}>
      <div className={cn('gc-msg-bubble', `gc-msg-${author}`)}>
        <div className="gc-msg-author">
          <span className={cn('gc-author-badge', `gc-badge-${author}`)}>{displayName}</span>
        </div>
        <div className="gc-msg-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
            {body}
          </ReactMarkdown>
        </div>
        <div className="gc-msg-time">{timeAgo(post.created_at)}</div>
      </div>
    </div>
  )
}

/* ── Message List ────────────────────────────────────── */

function GroupMessageList({ messages }: { messages: HubPost[] }) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoScrollRef = useRef(true)

  useEffect(() => {
    if (autoScrollRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100
    autoScrollRef.current = atBottom
  }, [])

  return (
    <div className="gc-msg-list" ref={containerRef} onScroll={handleScroll}>
      <div className="gc-msg-list-inner">
        {messages.map(post => (
          <GroupMessageBubble key={post.id} post={post} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

/* ── Compose Bar ─────────────────────────────────────── */

function ComposeBar({ onSend, sending }: { onSend: (text: string) => void; sending: boolean }) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || sending) return
    onSend(trimmed)
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 150) + 'px'
  }

  return (
    <div className="gc-compose">
      <form className="gc-compose-form" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className="gc-compose-textarea"
          placeholder="Type a message..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          rows={1}
          disabled={sending}
        />
        <button
          type="submit"
          className="gc-compose-send"
          disabled={!text.trim() || sending}
        >
          {sending ? '...' : '\u{27A4}'}
        </button>
      </form>
    </div>
  )
}

/* ── Thread Selector ─────────────────────────────────── */

function ThreadSelector() {
  const threads = useGroupChatStore(s => s.threads)
  const activeThreadId = useGroupChatStore(s => s.activeThreadId)
  const setActiveThread = useGroupChatStore(s => s.setActiveThread)
  const [open, setOpen] = useState(false)

  if (threads.length === 0) return null

  const active = threads.find(t => t.id === activeThreadId)

  return (
    <div className="gc-thread-selector">
      <button className="gc-thread-toggle" onClick={() => setOpen(v => !v)}>
        <span className="gc-thread-current">
          {active?.title || 'Select conversation'}
        </span>
        <svg className={cn('gc-chevron', open && 'gc-chevron-open')} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="gc-thread-dropdown">
          {threads.map(t => (
            <button
              key={t.id}
              className={cn('gc-thread-item', t.id === activeThreadId && 'gc-thread-item-active')}
              onClick={() => {
                setActiveThread(t.id)
                setOpen(false)
              }}
            >
              <span className="gc-thread-title">{t.title || 'Untitled'}</span>
              <span className="gc-thread-meta">
                {t.room_label && <span className="gc-thread-room">{t.room_label}</span>}
                {t.created_at && <span className="gc-thread-date">{timeAgo(t.created_at)}</span>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── New Thread Modal ────────────────────────────────── */

function NewThreadModal({ onClose, onCreate }: { onClose: () => void; onCreate: (title: string, body: string) => void }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onCreate(title.trim(), body.trim() || title.trim())
    onClose()
  }

  return (
    <div className="gc-modal-overlay" onClick={onClose}>
      <div className="gc-modal" onClick={e => e.stopPropagation()}>
        <h3 className="gc-modal-title">New Conversation</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="gc-modal-input"
            placeholder="Conversation title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="gc-modal-textarea"
            placeholder="First message (optional)"
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={3}
          />
          <div className="gc-modal-actions">
            <button type="button" className="gc-modal-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="gc-modal-create" disabled={!title.trim()}>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Main View ───────────────────────────────────────── */

export function GroupChatView() {
  const threads = useGroupChatStore(s => s.threads)
  const activeThreadId = useGroupChatStore(s => s.activeThreadId)
  const messages = useGroupChatStore(s => s.messages)
  const loading = useGroupChatStore(s => s.loading)
  const sending = useGroupChatStore(s => s.sending)
  const loadThreads = useGroupChatStore(s => s.loadThreads)
  const setActiveThread = useGroupChatStore(s => s.setActiveThread)
  const sendMessage = useGroupChatStore(s => s.sendMessage)
  const newThread = useGroupChatStore(s => s.newThread)
  const startPolling = useGroupChatStore(s => s.startPolling)
  const stopPolling = useGroupChatStore(s => s.stopPolling)
  const [showNewThread, setShowNewThread] = useState(false)

  useEffect(() => {
    loadThreads()
  }, [loadThreads])

  // Auto-select the first thread when threads load
  useEffect(() => {
    if (threads.length > 0 && !activeThreadId) {
      setActiveThread(threads[0].id)
    }
  }, [threads, activeThreadId, setActiveThread])

  // Start/stop polling when active thread changes
  useEffect(() => {
    if (activeThreadId) {
      startPolling()
    }
    return () => stopPolling()
  }, [activeThreadId, startPolling, stopPolling])

  const handleCreateThread = useCallback((title: string, body: string) => {
    newThread(title, body)
  }, [newThread])

  return (
    <div className="gc-view">
      {/* Header */}
      <div className="gc-header">
        <div className="gc-header-left">
          <span className="gc-header-icon">{'\u{1F465}'}</span>
          <span className="gc-header-title">Group Chat</span>
          <span className="gc-header-subtitle">Corey + ACG + Root</span>
        </div>
        <div className="gc-header-right">
          <ThreadSelector />
          <button className="gc-new-btn" onClick={() => setShowNewThread(true)} title="New conversation">
            +
          </button>
        </div>
      </div>

      {/* Message area */}
      {loading && messages.length === 0 ? (
        <div className="gc-loading">
          <LoadingSpinner size={32} />
        </div>
      ) : !activeThreadId ? (
        <div className="gc-empty">
          <EmptyState
            title="No conversations yet"
            description="Start a new conversation with ACG and Root"
            action={
              <button className="gc-start-btn" onClick={() => setShowNewThread(true)}>
                New Conversation
              </button>
            }
          />
        </div>
      ) : messages.length === 0 && !loading ? (
        <div className="gc-empty">
          <EmptyState
            title="No messages yet"
            description="Send the first message in this conversation"
          />
        </div>
      ) : (
        <GroupMessageList messages={messages} />
      )}

      {/* Compose bar (only when a thread is active) */}
      {activeThreadId && (
        <ComposeBar onSend={sendMessage} sending={sending} />
      )}

      {/* New thread modal */}
      {showNewThread && (
        <NewThreadModal
          onClose={() => setShowNewThread(false)}
          onCreate={handleCreateThread}
        />
      )}
    </div>
  )
}

import { useEffect, useState, useCallback, useRef, memo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useHubStore } from '../../stores/hubStore'
import { LoadingSpinner } from '../common/LoadingSpinner'
import { EmptyState } from '../common/EmptyState'
import type { HubGroup, HubRoom, HubThread, HubPost } from '../../types/hub'
import './HubView.css'

/* ── Helpers ─────────────────────────────────────────── */

function timeAgo(iso?: string): string {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

function getBody(item: HubThread | HubPost): string {
  return item.body || item.properties?.body || ''
}

function truncate(text: string, len: number): string {
  if (text.length <= len) return text
  return text.slice(0, len).trimEnd() + '...'
}

/* ── Back Button ─────────────────────────────────────── */

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button className="hub-back-btn" onClick={onClick} type="button">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  )
}

/* ── Group List ──────────────────────────────────────── */

const GroupList = memo(function GroupList({
  groups,
  onSelect,
}: {
  groups: HubGroup[]
  onSelect: (g: HubGroup) => void
}) {
  if (groups.length === 0) {
    return <EmptyState title="No groups" description="You don't belong to any HUB groups yet." />
  }
  return (
    <div className="hub-list">
      <div className="hub-list-header">
        <h2 className="hub-list-title">Groups</h2>
      </div>
      {groups.map((g) => (
        <button
          key={g.id}
          className="hub-list-item"
          onClick={() => onSelect(g)}
          type="button"
        >
          <div className="hub-item-icon hub-item-icon--group">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <div className="hub-item-content">
            <span className="hub-item-name">{g.display_name || g.slug}</span>
            {g.description && (
              <span className="hub-item-desc">{truncate(g.description, 80)}</span>
            )}
          </div>
          <svg className="hub-item-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  )
})

/* ── Room List ───────────────────────────────────────── */

const RoomList = memo(function RoomList({
  rooms,
  group,
  onSelect,
  onBack,
}: {
  rooms: HubRoom[]
  group: HubGroup
  onSelect: (r: HubRoom) => void
  onBack: () => void
}) {
  return (
    <div className="hub-list">
      <div className="hub-list-header">
        <BackButton onClick={onBack} label={group.display_name || 'Groups'} />
        <h2 className="hub-list-title">Rooms</h2>
      </div>
      {rooms.length === 0 ? (
        <EmptyState title="No rooms" description="This group has no rooms yet." />
      ) : (
        rooms.map((r) => (
          <button
            key={r.id}
            className="hub-list-item"
            onClick={() => onSelect(r)}
            type="button"
          >
            <div className="hub-item-icon hub-item-icon--room">
              <span>#</span>
            </div>
            <div className="hub-item-content">
              <span className="hub-item-name">{r.display_name || r.slug}</span>
              {r.room_type && (
                <span className="hub-item-desc">{r.room_type}</span>
              )}
            </div>
            <svg className="hub-item-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))
      )}
    </div>
  )
})

/* ── Thread List ─────────────────────────────────────── */

const ThreadList = memo(function ThreadList({
  threads,
  room,
  onSelect,
  onBack,
  onCompose,
}: {
  threads: HubThread[]
  room: HubRoom
  onSelect: (t: HubThread) => void
  onBack: () => void
  onCompose: () => void
}) {
  return (
    <div className="hub-list">
      <div className="hub-list-header">
        <BackButton onClick={onBack} label={room.display_name || 'Rooms'} />
        <div className="hub-list-header-row">
          <h2 className="hub-list-title">Threads</h2>
          <button className="hub-compose-btn" onClick={onCompose} type="button" title="New thread">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
      {threads.length === 0 ? (
        <EmptyState title="No threads" description="Start a new conversation in this room." />
      ) : (
        threads.map((t) => {
          const body = getBody(t)
          return (
            <button
              key={t.id}
              className="hub-list-item hub-list-item--thread"
              onClick={() => onSelect(t)}
              type="button"
            >
              <div className="hub-item-content">
                <span className="hub-item-name">{t.title || '(untitled)'}</span>
                {body && (
                  <span className="hub-item-preview">{truncate(body, 120)}</span>
                )}
                <div className="hub-item-meta">
                  {t.created_by && <span className="hub-item-author">{t.created_by}</span>}
                  {t.created_at && <span className="hub-item-time">{timeAgo(t.created_at)}</span>}
                </div>
              </div>
              <svg className="hub-item-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )
        })
      )}
    </div>
  )
})

/* ── Post View (thread detail) ───────────────────────── */

const PostView = memo(function PostView({
  thread,
  posts,
  onBack,
}: {
  thread: HubThread
  posts: HubPost[]
  onBack: () => void
}) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [posts.length])

  const threadBody = getBody(thread)

  return (
    <div className="hub-posts">
      <div className="hub-posts-header">
        <BackButton onClick={onBack} label="Threads" />
        <h2 className="hub-posts-title">{thread.title || '(untitled)'}</h2>
        {thread.created_by && (
          <div className="hub-posts-meta">
            <span className="hub-item-author">{thread.created_by}</span>
            {thread.created_at && <span className="hub-item-time">{timeAgo(thread.created_at)}</span>}
          </div>
        )}
      </div>

      <div className="hub-posts-body">
        {/* Thread OP */}
        {threadBody && (
          <div className="hub-post hub-post--op">
            <div className="hub-post-author">
              <div className="hub-avatar">{(thread.created_by || '?')[0].toUpperCase()}</div>
              <div className="hub-post-author-info">
                <span className="hub-post-author-name">{thread.created_by || 'Unknown'}</span>
                <span className="hub-post-author-time">{timeAgo(thread.created_at)}</span>
              </div>
            </div>
            <div className="hub-post-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
                {threadBody}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Replies */}
        {posts.length === 0 && !threadBody && (
          <EmptyState title="No posts yet" description="Be the first to reply." />
        )}
        {posts.map((p) => (
          <div key={p.id} className="hub-post">
            <div className="hub-post-author">
              <div className="hub-avatar">{(p.created_by || '?')[0].toUpperCase()}</div>
              <div className="hub-post-author-info">
                <span className="hub-post-author-name">{p.created_by || 'Unknown'}</span>
                <span className="hub-post-author-time">{timeAgo(p.created_at)}</span>
              </div>
            </div>
            <div className="hub-post-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
                {getBody(p)}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  )
})

/* ── Compose Bar ─────────────────────────────────────── */

function ComposeBar({
  mode,
  onSubmit,
  onCancel,
}: {
  mode: 'thread' | 'reply'
  onSubmit: (title: string, body: string) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bodyRef.current?.focus()
  }, [])

  const handleSubmit = async () => {
    const trimBody = body.trim()
    if (!trimBody) return
    if (mode === 'thread' && !title.trim()) return
    setSubmitting(true)
    onSubmit(title.trim(), trimBody)
    setTitle('')
    setBody('')
    setSubmitting(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <div className="hub-compose">
      {mode === 'thread' && (
        <input
          className="hub-compose-title"
          type="text"
          placeholder="Thread title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={submitting}
        />
      )}
      <div className="hub-compose-row">
        <textarea
          ref={bodyRef}
          className="hub-compose-body"
          placeholder={mode === 'thread' ? 'Write your post...' : 'Reply...'}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          disabled={submitting}
        />
        <div className="hub-compose-actions">
          <button
            className="hub-compose-cancel"
            onClick={onCancel}
            type="button"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            className="hub-compose-send"
            onClick={handleSubmit}
            type="button"
            disabled={submitting || !body.trim() || (mode === 'thread' && !title.trim())}
          >
            {submitting ? 'Sending...' : mode === 'thread' ? 'Post Thread' : 'Reply'}
          </button>
        </div>
      </div>
      <span className="hub-compose-hint">Ctrl+Enter to send</span>
    </div>
  )
}

/* ── Sidebar (desktop) ───────────────────────────────── */

function HubSidebar({
  groups,
  rooms,
  selectedGroup,
  selectedRoom,
  onSelectGroup,
  onSelectRoom,
}: {
  groups: HubGroup[]
  rooms: HubRoom[]
  selectedGroup: HubGroup | null
  selectedRoom: HubRoom | null
  onSelectGroup: (g: HubGroup) => void
  onSelectRoom: (r: HubRoom) => void
}) {
  return (
    <aside className="hub-sidebar">
      <div className="hub-sidebar-header">
        <h3 className="hub-sidebar-title">HUB</h3>
      </div>
      <nav className="hub-sidebar-nav">
        {groups.map((g) => {
          const isSelected = selectedGroup?.id === g.id
          return (
            <div key={g.id} className="hub-sidebar-group">
              <button
                className={`hub-sidebar-group-btn ${isSelected ? 'hub-sidebar-group-btn--active' : ''}`}
                onClick={() => onSelectGroup(g)}
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                <span>{g.display_name || g.slug}</span>
              </button>
              {isSelected && rooms.length > 0 && (
                <div className="hub-sidebar-rooms">
                  {rooms.map((r) => (
                    <button
                      key={r.id}
                      className={`hub-sidebar-room-btn ${selectedRoom?.id === r.id ? 'hub-sidebar-room-btn--active' : ''}`}
                      onClick={() => onSelectRoom(r)}
                      type="button"
                    >
                      <span className="hub-sidebar-hash">#</span>
                      <span>{r.display_name || r.slug}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
        {groups.length === 0 && (
          <div className="hub-sidebar-empty">No groups</div>
        )}
      </nav>
    </aside>
  )
}

/* ── Main HubView ────────────────────────────────────── */

export function HubView() {
  const {
    groups, rooms, threads, posts,
    selectedGroup, selectedRoom, selectedThread,
    view, loading, error,
    loadGroups, selectGroup, selectRoom, selectThread,
    navigateBack, createThread, createPost,
  } = useHubStore()

  const [composing, setComposing] = useState(false)
  const [composeMode, setComposeMode] = useState<'thread' | 'reply'>('thread')

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  const handleSelectGroup = useCallback((g: HubGroup) => {
    setComposing(false)
    selectGroup(g)
  }, [selectGroup])

  const handleSelectRoom = useCallback((r: HubRoom) => {
    setComposing(false)
    selectRoom(r)
  }, [selectRoom])

  const handleSelectThread = useCallback((t: HubThread) => {
    setComposing(false)
    selectThread(t)
  }, [selectThread])

  const handleBack = useCallback(() => {
    setComposing(false)
    navigateBack()
  }, [navigateBack])

  const handleNewThread = useCallback(() => {
    setComposeMode('thread')
    setComposing(true)
  }, [])

  const handleReply = useCallback(() => {
    setComposeMode('reply')
    setComposing(true)
  }, [])

  const handleComposeSubmit = useCallback(async (title: string, body: string) => {
    let ok = false
    if (composeMode === 'thread') {
      ok = await createThread(title, body)
    } else {
      ok = await createPost(body)
    }
    if (ok) setComposing(false)
  }, [composeMode, createThread, createPost])

  const handleComposeCancel = useCallback(() => {
    setComposing(false)
  }, [])

  // Determine what's visible on mobile
  const showingDetail = view === 'posts'
  const showingThreads = view === 'threads'

  /* ── Desktop: sidebar + main area ──────────────────── */
  /* ── Mobile:  list OR detail (like AgentMail)  ─────── */

  return (
    <div className="hub-view">
      {/* Desktop sidebar */}
      <HubSidebar
        groups={groups}
        rooms={rooms}
        selectedGroup={selectedGroup}
        selectedRoom={selectedRoom}
        onSelectGroup={handleSelectGroup}
        onSelectRoom={handleSelectRoom}
      />

      {/* Main content area */}
      <div className="hub-main">
        {loading && groups.length === 0 && threads.length === 0 && posts.length === 0 ? (
          <div className="hub-loading">
            <LoadingSpinner size={32} />
          </div>
        ) : error && groups.length === 0 ? (
          <EmptyState title="Error" description={error} />
        ) : (
          <>
            {/* Mobile: groups view */}
            <div className={`hub-panel hub-panel--groups ${view !== 'groups' ? 'hub-panel--hidden-mobile' : ''}`}>
              <GroupList groups={groups} onSelect={handleSelectGroup} />
            </div>

            {/* Mobile: rooms view */}
            <div className={`hub-panel hub-panel--rooms ${view !== 'rooms' ? 'hub-panel--hidden-mobile' : ''}`}>
              {selectedGroup && (
                <RoomList
                  rooms={rooms}
                  group={selectedGroup}
                  onSelect={handleSelectRoom}
                  onBack={handleBack}
                />
              )}
            </div>

            {/* Desktop + Mobile: threads view */}
            <div className={`hub-panel hub-panel--threads ${view !== 'threads' && view !== 'posts' ? 'hub-panel--hidden-mobile' : ''} ${showingDetail ? 'hub-panel--hidden-mobile-detail' : ''}`}>
              {selectedRoom && (
                <ThreadList
                  threads={threads}
                  room={selectedRoom}
                  onSelect={handleSelectThread}
                  onBack={handleBack}
                  onCompose={handleNewThread}
                />
              )}
              {!selectedRoom && view !== 'groups' && view !== 'rooms' && (
                <EmptyState title="Select a room" description="Choose a room from the sidebar to view threads." />
              )}
            </div>

            {/* Desktop + Mobile: post detail view */}
            <div className={`hub-panel hub-panel--posts ${!showingDetail ? 'hub-panel--hidden-mobile-posts' : 'hub-panel--visible-mobile'}`}>
              {selectedThread ? (
                <div className="hub-detail-wrapper">
                  <PostView
                    thread={selectedThread}
                    posts={posts}
                    onBack={handleBack}
                  />
                  {/* Reply button */}
                  {!composing && (
                    <button className="hub-reply-btn" onClick={handleReply} type="button">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 17 4 12 9 7" />
                        <path d="M20 18v-2a4 4 0 00-4-4H4" />
                      </svg>
                      Reply
                    </button>
                  )}
                </div>
              ) : (
                <EmptyState title="Select a thread" description="Choose a thread to view the conversation." />
              )}
            </div>

            {/* Compose bar (anchored to bottom) */}
            {composing && (
              <div className="hub-compose-overlay">
                <ComposeBar
                  mode={composeMode}
                  onSubmit={handleComposeSubmit}
                  onCancel={handleComposeCancel}
                />
              </div>
            )}

            {/* Loading indicator for sub-views */}
            {loading && (groups.length > 0 || threads.length > 0) && (
              <div className="hub-loading-inline">
                <LoadingSpinner size={20} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

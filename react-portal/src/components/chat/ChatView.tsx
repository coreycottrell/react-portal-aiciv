import { useEffect, useState, useMemo, useCallback } from 'react'
import { useChatStore } from '../../stores/chatStore'
import { uploadFile } from '../../api/client'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { SearchPanel } from './SearchPanel'
import { LoadingSpinner } from '../common/LoadingSpinner'
import { EmptyState } from '../common/EmptyState'
import './ChatView.css'

export function ChatView() {
  const messages = useChatStore(s => s.messages)
  const loading = useChatStore(s => s.loading)
  const sending = useChatStore(s => s.sending)
  const loadHistory = useChatStore(s => s.loadHistory)
  const send = useChatStore(s => s.send)
  const react = useChatStore(s => s.react)
  const connectWs = useChatStore(s => s.connectWs)
  const disconnectWs = useChatStore(s => s.disconnectWs)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadHistory()
    connectWs()
    return () => disconnectWs()
  }, [loadHistory, connectWs, disconnectWs])

  const handleUpload = async (file: File) => {
    try {
      const res = await uploadFile(file)
      if (res.ok) {
        send(`[Uploaded file: ${res.filename}](${res.url})`)
      }
    } catch {
      // silently fail
    }
  }

  const { matchCount, highlightIds } = useMemo(() => {
    if (!searchQuery.trim()) return { matchCount: 0, highlightIds: new Set<string>() }
    const q = searchQuery.toLowerCase()
    const ids = new Set<string>()
    for (const msg of messages) {
      if (msg.text.toLowerCase().includes(q)) {
        ids.add(msg.id)
      }
    }
    return { matchCount: ids.size, highlightIds: ids }
  }, [messages, searchQuery])

  return (
    <div className="chat-view">
      <div className="chat-header-bar">
        <button
          className={`chat-search-toggle ${showSearch ? 'chat-search-toggle-active' : ''}`}
          onClick={() => {
            setShowSearch(v => !v)
            if (showSearch) setSearchQuery('')
          }}
          title="Search messages"
        >
          {'\u{1F50D}'}
        </button>
      </div>
      {showSearch && (
        <SearchPanel
          onSearch={setSearchQuery}
          matchCount={matchCount}
          onClose={() => { setShowSearch(false); setSearchQuery('') }}
        />
      )}
      {loading && messages.length === 0 ? (
        <div className="chat-loading">
          <LoadingSpinner size={32} />
        </div>
      ) : messages.length === 0 ? (
        <div className="chat-empty">
          <EmptyState
            title="No messages yet"
            description="Send a message to start a conversation with your CIV"
          />
        </div>
      ) : (
        <MessageList messages={messages} onReact={react} highlightIds={highlightIds} />
      )}
      <ChatInput onSend={send} onUpload={handleUpload} sending={sending} />
    </div>
  )
}

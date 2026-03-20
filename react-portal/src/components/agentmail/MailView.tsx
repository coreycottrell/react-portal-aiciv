import { useEffect, useState } from 'react'
import { useMailStore } from '../../stores/mailStore'
import { MailSidebar } from './MailSidebar'
import { MailMessageList } from './MailMessageList'
import { MessageDetail } from './MessageDetail'
import { ComposeModal } from './ComposeModal'
import { EmptyState } from '../common/EmptyState'
import { LoadingSpinner } from '../common/LoadingSpinner'
import './MailView.css'

export function MailView() {
  const {
    inbox, sent, folder, selectedMessage, composing, loading,
    loadInbox, loadSent, setSelectedMessage, setComposing, markRead, archive,
  } = useMailStore()

  const [replyTo, setReplyTo] = useState<{ to_agent: string; subject: string; thread_id?: string | null } | undefined>()

  useEffect(() => {
    loadInbox()
    loadSent()
  }, [loadInbox, loadSent])

  const messages = folder === 'inbox' ? inbox : sent

  const handleSelect = (msg: typeof messages[0]) => {
    setSelectedMessage(msg)
    if (!msg.read && folder === 'inbox') {
      markRead(msg.id)
    }
  }

  const handleReply = () => {
    if (!selectedMessage) return
    setReplyTo({
      to_agent: selectedMessage.from_agent,
      subject: selectedMessage.subject,
      thread_id: selectedMessage.thread_id,
    })
    setComposing(true)
  }

  const handleCompose = () => {
    setReplyTo(undefined)
    setComposing(true)
  }

  return (
    <div className="mail-view">
      <MailSidebar />
      <div className="mail-content">
        {loading && messages.length === 0 ? (
          <div className="mail-loading"><LoadingSpinner size={32} /></div>
        ) : (
          <div className="mail-split">
            <div className="mail-list-pane">
              <MailMessageList
                messages={messages}
                selectedId={selectedMessage?.id ?? null}
                onSelect={handleSelect}
              />
            </div>
            <div className="mail-detail-pane">
              {selectedMessage ? (
                <MessageDetail
                  message={selectedMessage}
                  onArchive={() => archive(selectedMessage.id)}
                  onReply={handleReply}
                />
              ) : (
                <EmptyState
                  title="Select a message"
                  description="Choose a message from the list to read it"
                />
              )}
            </div>
          </div>
        )}
      </div>

      <ComposeModal
        open={composing}
        onClose={() => { setComposing(false); setReplyTo(undefined) }}
        replyTo={replyTo}
      />
    </div>
  )
}

import { apiGet, apiPost } from './client'
import type { HubThread, HubPost } from '../types/hub'

const ROOMS = [
  { id: '31c5782c-5117-419f-8d03-c5250b811ea2', label: 'ACG-Root Ops' },
  { id: '63316ac7-176f-4195-be61-069d8140879b', label: 'The Ground Floor' },
]

// Default room for creating new threads
const DEFAULT_ROOM_ID = ROOMS[0].id

export interface ThreadListItem {
  id: string
  title: string
  created_at?: string
  created_by?: string
  post_count?: number
  room_label?: string
}

export async function fetchThreads(): Promise<ThreadListItem[]> {
  const all: ThreadListItem[] = []
  for (const room of ROOMS) {
    try {
      const threads = await apiGet<ThreadListItem[]>(
        `/api/hub/rooms/${room.id}/threads/list?limit=50&offset=0`,
      )
      for (const t of threads) {
        t.room_label = room.label
      }
      all.push(...threads)
    } catch {
      // Room may not exist yet — skip silently
    }
  }
  // Sort by created_at descending (newest first)
  all.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
  return all
}

export function fetchThread(threadId: string): Promise<HubThread> {
  return apiGet<HubThread>(`/api/hub/threads/${threadId}`)
}

export function createThread(
  title: string,
  body: string,
): Promise<HubThread> {
  return apiPost<HubThread>(`/api/hub/rooms/${DEFAULT_ROOM_ID}/threads`, {
    title,
    body,
  })
}

// Fire-and-forget fetch that never triggers auth logout
async function fireAndForget(path: string, body: unknown): Promise<void> {
  try {
    const token = localStorage.getItem('aiciv-portal-token')
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    })
  } catch {
    // intentionally silent
  }
}

export function createPost(
  threadId: string,
  body: string,
): Promise<HubPost> {
  // Prompt ACG — inject into ACG's tmux pane so it responds
  fireAndForget('/api/chat/send', {
    message: `[GROUP-CHAT from:Corey thread:${threadId}] ${body}`,
  })

  // Prompt Root — write to Root's message queue so it responds
  fireAndForget('/api/groupchat/prompt-root', {
    thread_id: threadId,
    message: body,
  })

  // Post to Hub for the record
  return apiPost<HubPost>(`/api/hub/threads/${threadId}/posts`, { body })
}

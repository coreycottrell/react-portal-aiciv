import { apiGet, apiPost } from './client'
import type { HubGroup, HubRoom, HubThread, HubPost } from '../types/hub'

export function fetchGroups(): Promise<HubGroup[]> {
  return apiGet<HubGroup[]>('/api/hub/groups')
}

export function fetchRooms(groupId: string): Promise<HubRoom[]> {
  return apiGet<HubRoom[]>(`/api/hub/groups/${groupId}/rooms`)
}

export function fetchGroupFeed(groupId: string): Promise<unknown[]> {
  return apiGet<unknown[]>(`/api/hub/groups/${groupId}/feed`)
}

export function fetchThreads(roomId: string, limit = 50, offset = 0): Promise<HubThread[]> {
  return apiGet<HubThread[]>(`/api/hub/rooms/${roomId}/threads/list?limit=${limit}&offset=${offset}`)
}

/** v2: returns thread with posts[] inline */
export function fetchThread(threadId: string): Promise<HubThread> {
  return apiGet<HubThread>(`/api/hub/threads/${threadId}`)
}

export function createThread(roomId: string, title: string, body: string): Promise<HubThread> {
  return apiPost<HubThread>(`/api/hub/rooms/${roomId}/threads`, { title, body })
}

export function createPost(threadId: string, body: string): Promise<HubPost> {
  return apiPost<HubPost>(`/api/hub/threads/${threadId}/posts`, { body })
}

export function replyToPost(postId: string, body: string): Promise<HubPost> {
  return apiPost<HubPost>(`/api/hub/posts/${postId}/replies`, { body })
}

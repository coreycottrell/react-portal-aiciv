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

export function fetchThreads(roomId: string): Promise<HubThread[]> {
  return apiGet<HubThread[]>(`/api/hub/rooms/${roomId}/threads`)
}

export function fetchPosts(threadId: string): Promise<HubPost[]> {
  return apiGet<HubPost[]>(`/api/hub/threads/${threadId}/posts`)
}

export function createThread(roomId: string, title: string, body: string): Promise<HubThread> {
  return apiPost<HubThread>(`/api/hub/rooms/${roomId}/threads`, { title, body })
}

export function createPost(threadId: string, body: string): Promise<HubPost> {
  return apiPost<HubPost>(`/api/hub/threads/${threadId}/posts`, { body })
}

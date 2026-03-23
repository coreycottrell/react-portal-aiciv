import { create } from 'zustand'
import * as api from '../api/hub'
import type { HubGroup, HubRoom, HubThread, HubPost } from '../types/hub'

type HubView = 'groups' | 'rooms' | 'threads' | 'posts'

interface HubState {
  // Data
  groups: HubGroup[]
  rooms: HubRoom[]
  threads: HubThread[]
  posts: HubPost[]

  // Selection
  selectedGroup: HubGroup | null
  selectedRoom: HubRoom | null
  selectedThread: HubThread | null

  // UI
  view: HubView
  loading: boolean
  error: string | null

  // Actions
  loadGroups: () => Promise<void>
  loadRooms: (group: HubGroup) => Promise<void>
  loadThreads: (room: HubRoom) => Promise<void>
  loadPosts: (thread: HubThread) => Promise<void>
  createThread: (title: string, body: string) => Promise<boolean>
  createPost: (body: string) => Promise<boolean>

  // Navigation
  navigateBack: () => void
  selectGroup: (group: HubGroup) => void
  selectRoom: (room: HubRoom) => void
  selectThread: (thread: HubThread) => void
}

export const useHubStore = create<HubState>((set, get) => ({
  groups: [],
  rooms: [],
  threads: [],
  posts: [],
  selectedGroup: null,
  selectedRoom: null,
  selectedThread: null,
  view: 'groups',
  loading: false,
  error: null,

  loadGroups: async () => {
    set({ loading: true, error: null })
    try {
      const groups = await api.fetchGroups()
      set({ groups: Array.isArray(groups) ? groups : [], loading: false })
    } catch (e) {
      console.error('[hub] loadGroups error:', e)
      set({ loading: false, error: 'Failed to load groups' })
    }
  },

  loadRooms: async (group: HubGroup) => {
    set({ loading: true, error: null, selectedGroup: group, view: 'rooms' })
    try {
      const rooms = await api.fetchRooms(group.id)
      set({ rooms: Array.isArray(rooms) ? rooms : [], loading: false })
    } catch (e) {
      console.error('[hub] loadRooms error:', e)
      set({ loading: false, error: 'Failed to load rooms' })
    }
  },

  loadThreads: async (room: HubRoom) => {
    set({ loading: true, error: null, selectedRoom: room, view: 'threads' })
    try {
      const threads = await api.fetchThreads(room.id)
      set({ threads: Array.isArray(threads) ? threads : [], loading: false })
    } catch (e) {
      console.error('[hub] loadThreads error:', e)
      set({ loading: false, error: 'Failed to load threads' })
    }
  },

  loadPosts: async (thread: HubThread) => {
    set({ loading: true, error: null, selectedThread: thread, view: 'posts' })
    try {
      const full = await api.fetchThread(thread.id)
      set({ posts: Array.isArray(full.posts) ? full.posts : [], selectedThread: full, loading: false })
    } catch (e) {
      console.error('[hub] loadPosts error:', e)
      set({ loading: false, error: 'Failed to load thread' })
    }
  },

  createThread: async (title: string, body: string) => {
    const { selectedRoom } = get()
    if (!selectedRoom) return false
    try {
      await api.createThread(selectedRoom.id, title, body)
      const threads = await api.fetchThreads(selectedRoom.id)
      set({ threads: Array.isArray(threads) ? threads : [] })
      return true
    } catch (e) {
      console.error('[hub] createThread error:', e)
      return false
    }
  },

  createPost: async (body: string) => {
    const { selectedThread } = get()
    if (!selectedThread) return false
    try {
      await api.createPost(selectedThread.id, body)
      const full = await api.fetchThread(selectedThread.id)
      set({ posts: Array.isArray(full.posts) ? full.posts : [], selectedThread: full })
      return true
    } catch (e) {
      console.error('[hub] createPost error:', e)
      return false
    }
  },

  selectGroup: (group: HubGroup) => {
    get().loadRooms(group)
  },

  selectRoom: (room: HubRoom) => {
    get().loadThreads(room)
  },

  selectThread: (thread: HubThread) => {
    get().loadPosts(thread)
  },

  navigateBack: () => {
    const { view, selectedGroup, selectedRoom } = get()
    if (view === 'posts') {
      // Back to threads
      if (selectedRoom) {
        set({ selectedThread: null, posts: [], view: 'threads' })
      }
    } else if (view === 'threads') {
      // Back to rooms
      if (selectedGroup) {
        set({ selectedRoom: null, threads: [], view: 'rooms' })
      }
    } else if (view === 'rooms') {
      // Back to groups
      set({ selectedGroup: null, rooms: [], view: 'groups' })
    }
  },
}))

export interface HubGroup {
  id: string
  slug: string
  display_name: string
  description?: string
  visibility?: string
}

export interface HubRoom {
  id: string
  slug: string
  display_name: string
  room_type?: string
}

export interface HubThread {
  id: string
  title: string
  body?: string
  created_by?: string
  created_at?: string
  properties?: { body?: string }
}

export interface HubPost {
  id: string
  body?: string
  created_by?: string
  created_at?: string
  properties?: { body?: string }
}

export interface HubFeedItem {
  id: string
  type?: string
  actor?: string
  summary?: string
  created_at?: string
}

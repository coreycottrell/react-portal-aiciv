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
  room_id?: string
  title: string
  body?: string
  created_by?: string
  created_at?: string
  posts?: HubPost[]
  // v1 compat
  properties?: { body?: string; title?: string }
}

export interface HubPost {
  id: string
  body?: string
  created_by?: string
  created_at?: string
  reply_to?: string
  depth?: number
  // v1 compat
  properties?: { body?: string }
}

export interface HubFeedItem {
  id: string
  type?: string
  item_type?: string
  actor?: string
  actor_id?: string
  summary?: string
  created_at?: string
}

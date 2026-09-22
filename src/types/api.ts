// Shapes returned by the backend API. See hotel-guest-assistant-backend/README.md → API reference.

export interface RoomAvailability {
  room_type_id: string
  name: string
  description: string
  max_guests: number
  price_per_night: number
  total_price: number
  breakfast_included: boolean
  rooms_available: number
}

export interface TextResponse {
  response_type: 'text'
  message: string
}

export interface SlotCollectionResponse {
  response_type: 'slot_collection'
  message: string
  missing_fields: string[]
  slots: {
    check_in: string | null
    check_out: string | null
    guest_count: number | null
  }
}

export interface AvailabilityResponse {
  response_type: 'availability'
  message: string
  check_in: string
  check_out: string
  guest_count: number
  nights: number
  rooms: RoomAvailability[]
}

export interface ErrorResponse {
  response_type: 'error'
  message: string
  code: string
}

export type ChatResponse = TextResponse | SlotCollectionResponse | AvailabilityResponse | ErrorResponse

// POST /conversations
export interface CreateConversationData {
  conversation_id: string
}

// GET /conversations/{id}/messages
export interface StoredMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface MessagesData {
  conversation_id: string
  messages: StoredMessage[]
}

// Shared success/error envelope used by /conversations endpoints
export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface ApiFailure {
  success: false
  error: {
    code: string
    message: string
  }
}

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure

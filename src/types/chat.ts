import type { RoomAvailability } from '@/types/api'

export type ChatRole = 'user' | 'assistant'

export interface AvailabilityResult {
  nights: number
  rooms: RoomAvailability[]
}

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  /** True when this assistant message is an error reply, so it can be styled distinctly. */
  isError?: boolean
  /** Present when this assistant message is an availability reply with rooms to show as cards. */
  availability?: AvailabilityResult
}

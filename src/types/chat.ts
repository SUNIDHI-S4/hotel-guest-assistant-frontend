export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  /** True when this assistant message is an error reply, so it can be styled distinctly. */
  isError?: boolean
}

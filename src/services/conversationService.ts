import { apiClient } from '@/services/apiClient'
import type { ApiEnvelope, CreateConversationData, MessagesData, StoredMessage } from '@/types/api'

/** Starts a new conversation and returns its id. Throws on failure. */
export async function createConversation(): Promise<string> {
  const { data } = await apiClient.post<ApiEnvelope<CreateConversationData>>('/conversations')

  if (!data.success) {
    throw new Error(data.error.message)
  }

  return data.data.conversation_id
}

/**
 * Restores a conversation's message history (oldest first).
 * Throws if the conversation is unknown to the backend (e.g. an id saved from a much
 * earlier visit) or the request otherwise fails.
 */
export async function getMessages(conversationId: string): Promise<StoredMessage[]> {
  const { data } = await apiClient.get<ApiEnvelope<MessagesData>>(
    `/conversations/${conversationId}/messages`,
  )

  if (!data.success) {
    throw new Error(data.error.message)
  }

  return data.data.messages
}

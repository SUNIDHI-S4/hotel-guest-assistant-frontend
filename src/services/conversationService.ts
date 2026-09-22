import { apiClient } from '@/services/apiClient'
import type { ApiEnvelope, CreateConversationData } from '@/types/api'

/** Starts a new conversation and returns its id. Throws on failure. */
export async function createConversation(): Promise<string> {
  const { data } = await apiClient.post<ApiEnvelope<CreateConversationData>>('/conversations')

  if (!data.success) {
    throw new Error(data.error.message)
  }

  return data.data.conversation_id
}

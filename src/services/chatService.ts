import axios from 'axios'
import { apiClient } from '@/services/apiClient'
import type { ChatResponse, ErrorResponse } from '@/types/api'

const NETWORK_ERROR: ErrorResponse = {
  response_type: 'error',
  message: 'Could not reach the assistant. Please check your connection and try again.',
  code: 'network_error',
}

function isErrorResponse(value: unknown): value is ErrorResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as { response_type?: unknown }).response_type === 'error'
  )
}

/**
 * Sends a guest message to an existing conversation.
 * Never throws: a failed request resolves to an `ErrorResponse` so callers can
 * render it the same way as a normal `error` reply from the backend.
 */
export async function sendChatMessage(conversationId: string, message: string): Promise<ChatResponse> {
  try {
    const { data } = await apiClient.post<ChatResponse>('/chat', {
      conversation_id: conversationId,
      message,
    })
    return data
  } catch (error) {
    if (axios.isAxiosError(error) && isErrorResponse(error.response?.data)) {
      return error.response.data
    }
    return NETWORK_ERROR
  }
}

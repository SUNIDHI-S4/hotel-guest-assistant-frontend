import { useCallback, useEffect, useState } from 'react'
import { ChatHeader } from '@/components/ChatHeader'
import { ChatInput } from '@/components/ChatInput'
import { MessageList } from '@/components/MessageList'
import { sendChatMessage } from '@/services/chatService'
import { createConversation } from '@/services/conversationService'
import type { ChatMessage } from '@/types/chat'

export function ChatPage() {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [conversationFailed, setConversationFailed] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isSending, setIsSending] = useState(false)

  const startConversation = useCallback(() => {
    let cancelled = false

    createConversation()
      .then((id) => {
        if (!cancelled) setConversationId(id)
      })
      .catch(() => {
        if (!cancelled) setConversationFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => startConversation(), [startConversation])

  const handleRetry = () => {
    setConversationFailed(false)
    startConversation()
  }

  const handleSend = async (text: string) => {
    if (!conversationId || isSending) return

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', content: text }])
    setIsSending(true)

    const response = await sendChatMessage(conversationId, text)

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.message,
        isError: response.response_type === 'error',
        availability:
          response.response_type === 'availability'
            ? { nights: response.nights, rooms: response.rooms }
            : undefined,
      },
    ])
    setIsSending(false)
  }

  return (
    <div className="flex h-dvh justify-center bg-cream-100 sm:p-6">
      <main className="flex h-full w-full max-w-2xl flex-col overflow-hidden bg-cream-50 sm:rounded-3xl sm:border sm:border-brand-100 sm:shadow-lg sm:shadow-brand-200/40">
        <ChatHeader />
        <MessageList messages={messages} isSending={isSending} onSelectSuggestion={handleSend} />
        {conversationFailed && (
          <div className="flex items-center justify-center gap-2 border-t border-red-100 bg-red-50 px-4 py-2 text-center text-xs text-red-700 sm:px-6">
            <span>Couldn&apos;t connect to the assistant.</span>
            <button
              type="button"
              onClick={handleRetry}
              className="font-semibold underline underline-offset-2 hover:text-red-800"
            >
              Retry
            </button>
          </div>
        )}
        <ChatInput onSend={handleSend} disabled={!conversationId || isSending} />
      </main>
    </div>
  )
}

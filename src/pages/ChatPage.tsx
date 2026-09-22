import { useCallback, useEffect, useState } from 'react'
import { ChatHeader } from '@/components/ChatHeader'
import { ChatInput } from '@/components/ChatInput'
import { ConnectingState } from '@/components/ConnectingState'
import { ConnectionErrorState } from '@/components/ConnectionErrorState'
import { MessageList } from '@/components/MessageList'
import { sendChatMessage } from '@/services/chatService'
import { createConversation, getMessages } from '@/services/conversationService'
import type { ChatMessage } from '@/types/chat'
import {
  clearStoredConversationId,
  getStoredConversationId,
  setStoredConversationId,
} from '@/utils/conversationStorage'

export function ChatPage() {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(true)
  const [conversationFailed, setConversationFailed] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isSending, setIsSending] = useState(false)

  const startConversation = useCallback(() => {
    let cancelled = false

    const init = async () => {
      const storedId = getStoredConversationId()

      // Resume a saved conversation and restore its history, if there is one.
      if (storedId) {
        try {
          const history = await getMessages(storedId)
          if (cancelled) return
          setConversationId(storedId)
          setMessages(history.map((m) => ({ id: m.id, role: m.role, content: m.content })))
          setIsConnecting(false)
          return
        } catch {
          // The saved id is gone or invalid (e.g. an old visit) - start fresh below.
          clearStoredConversationId()
        }
      }

      try {
        const id = await createConversation()
        if (cancelled) return
        setStoredConversationId(id)
        setConversationId(id)
      } catch {
        if (!cancelled) setConversationFailed(true)
      } finally {
        if (!cancelled) setIsConnecting(false)
      }
    }

    init()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => startConversation(), [startConversation])

  const handleRetry = () => {
    setConversationFailed(false)
    setIsConnecting(true)
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

  const status = isConnecting ? 'connecting' : conversationFailed ? 'offline' : 'online'

  return (
    <div className="flex h-dvh justify-center bg-cream-100 sm:p-6">
      <main className="flex h-full w-full max-w-2xl flex-col overflow-hidden bg-cream-50 sm:rounded-3xl sm:border sm:border-brand-100 sm:shadow-lg sm:shadow-brand-200/40">
        <ChatHeader status={status} />
        {isConnecting ? (
          <ConnectingState />
        ) : conversationFailed ? (
          <ConnectionErrorState onRetry={handleRetry} />
        ) : (
          <MessageList messages={messages} isSending={isSending} onSelectSuggestion={handleSend} />
        )}
        {!isConnecting && !conversationFailed && (
          <ChatInput onSend={handleSend} disabled={!conversationId || isSending} />
        )}
      </main>
    </div>
  )
}

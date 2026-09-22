import { useEffect, useState } from 'react'
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

  useEffect(() => {
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

  const handleSend = async (text: string) => {
    if (!conversationId || isSending) return

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', content: text }])
    setIsSending(true)

    const response = await sendChatMessage(conversationId, text)

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: response.message }])
    setIsSending(false)
  }

  return (
    <div className="flex h-dvh justify-center bg-cream-100 sm:p-6">
      <main className="flex h-full w-full max-w-2xl flex-col overflow-hidden bg-cream-50 sm:rounded-3xl sm:border sm:border-brand-100 sm:shadow-lg sm:shadow-brand-200/40">
        <ChatHeader />
        <MessageList messages={messages} onSelectSuggestion={handleSend} />
        {conversationFailed && (
          <p className="px-4 pb-1 text-center text-xs text-red-600 sm:px-6">
            Couldn&apos;t connect to the assistant. Please refresh the page.
          </p>
        )}
        <ChatInput onSend={handleSend} disabled={!conversationId || isSending} />
      </main>
    </div>
  )
}

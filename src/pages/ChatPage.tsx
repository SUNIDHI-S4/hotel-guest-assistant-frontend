import { useState } from 'react'
import { ChatHeader } from '@/components/ChatHeader'
import { ChatInput } from '@/components/ChatInput'
import { MessageList } from '@/components/MessageList'
import type { ChatMessage } from '@/types/chat'

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', content: text }])
  }

  return (
    <div className="flex h-dvh justify-center bg-cream-100 sm:p-6">
      <main className="flex h-full w-full max-w-2xl flex-col overflow-hidden bg-cream-50 sm:rounded-3xl sm:border sm:border-brand-100 sm:shadow-lg sm:shadow-brand-200/40">
        <ChatHeader />
        <MessageList messages={messages} />
        <ChatInput onSend={handleSend} />
      </main>
    </div>
  )
}

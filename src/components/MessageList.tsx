import type { ChatMessage } from '@/types/chat'
import { MessageBubble } from './MessageBubble'

export function MessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
      <div className="flex flex-col gap-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center px-4 py-10 text-center">
            <p className="text-lg font-semibold text-ink-900">Welcome! 👋</p>
            <p className="mt-1 max-w-xs text-sm text-ink-500">
              Ask me about the hotel, or check which rooms are free for your dates.
            </p>
          </div>
        ) : (
          messages.map((message) => <MessageBubble key={message.id} message={message} />)
        )}
      </div>
    </div>
  )
}

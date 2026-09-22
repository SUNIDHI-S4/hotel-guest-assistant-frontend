import type { ChatMessage } from '@/types/chat'

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%] ${
          isUser
            ? 'rounded-br-md bg-brand-500 text-white'
            : message.isError
              ? 'rounded-bl-md border border-red-200 bg-red-50 text-red-700'
              : 'rounded-bl-md border border-brand-100 bg-white text-ink-900'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

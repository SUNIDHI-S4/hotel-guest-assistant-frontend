import type { ChatMessage } from '@/types/chat'
import { AvailabilityCards } from './AvailabilityCards'

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  const hasCards = !isUser && (message.availability?.rooms.length ?? 0) > 0

  return (
    <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
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
      {hasCards && message.availability && (
        <div className="w-full">
          <AvailabilityCards {...message.availability} />
        </div>
      )}
    </div>
  )
}

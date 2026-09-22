import { ASSISTANT_NAME } from '@/config/site'
import type { ChatMessage } from '@/types/chat'
import { MessageBubble } from './MessageBubble'
import { SuggestedQuestions } from './SuggestedQuestions'

interface MessageListProps {
  messages: ChatMessage[]
  onSelectSuggestion: (question: string) => void
}

export function MessageList({ messages, onSelectSuggestion }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
      <div className="flex flex-col gap-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center gap-6 px-4 py-8 text-center">
            <div>
              <p className="text-lg font-semibold text-ink-900">Hi, I&apos;m {ASSISTANT_NAME} 👋</p>
              <p className="mt-1 max-w-xs text-sm text-ink-500">
                Ask me about the hotel, or check which rooms are free for your dates.
              </p>
            </div>
            <SuggestedQuestions onSelect={onSelectSuggestion} />
          </div>
        ) : (
          messages.map((message) => <MessageBubble key={message.id} message={message} />)
        )}
      </div>
    </div>
  )
}

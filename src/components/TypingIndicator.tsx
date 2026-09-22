export function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-live="polite" aria-label="Assistant is typing">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-brand-100 bg-white px-4 py-3">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400 [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400 [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400" />
      </div>
    </div>
  )
}

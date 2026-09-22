import { ASSISTANT_NAME, HOTEL_NAME } from '@/config/site'

export function ChatHeader() {
  return (
    <header className="flex items-center gap-3 border-b border-brand-100 bg-white px-4 py-3 sm:px-6">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21V8l9-5 9 5v13" />
          <path d="M9 21v-6h6v6" />
        </svg>
      </div>
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold leading-tight text-ink-900">{HOTEL_NAME}</h1>
        <p className="text-xs text-ink-500">{ASSISTANT_NAME} · Guest Assistant</p>
      </div>
    </header>
  )
}

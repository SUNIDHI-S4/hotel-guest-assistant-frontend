import { ASSISTANT_NAME, HOTEL_NAME } from '@/config/site'

export type ConnectionStatus = 'connecting' | 'online' | 'offline'

const STATUS_STYLES: Record<ConnectionStatus, { dot: string; label: string }> = {
  connecting: { dot: 'bg-amber-400', label: 'Connecting…' },
  online: { dot: 'bg-emerald-500', label: 'Online' },
  offline: { dot: 'bg-red-400', label: 'Offline' },
}

export function ChatHeader({ status = 'online' }: { status?: ConnectionStatus }) {
  const { dot, label } = STATUS_STYLES[status]

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
        <p className="flex items-center gap-1.5 text-xs text-ink-500">
          {ASSISTANT_NAME} · Guest Assistant
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
          <span className="sr-only">{label}</span>
        </p>
      </div>
    </header>
  )
}

import { ASSISTANT_NAME } from '@/config/site'

interface ConnectionErrorStateProps {
  onRetry: () => void
}

export function ConnectionErrorState({ onRetry }: ConnectionErrorStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.71 3.86a2 2 0 0 0-3.42 0Z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-ink-900">Couldn&apos;t connect to {ASSISTANT_NAME}</p>
        <p className="mt-1 max-w-xs text-sm text-ink-500">
          Please check that the assistant is online and try again.
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        Retry
      </button>
    </div>
  )
}

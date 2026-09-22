export function ConnectingState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
      <span
        className="h-6 w-6 animate-spin rounded-full border-2 border-sage-200 border-t-brand-500"
        aria-hidden="true"
      />
      <p className="text-sm text-ink-500">Connecting to the assistant…</p>
    </div>
  )
}

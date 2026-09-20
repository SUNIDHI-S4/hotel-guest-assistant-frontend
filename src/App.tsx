import { env } from '@/config/env'

function App() {
  return (
    <main className="flex h-full items-center justify-center bg-cream-50 px-4">
      <div className="max-w-sm rounded-3xl border border-brand-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-xl text-white">
          ✦
        </div>
        <h1 className="text-xl font-semibold text-ink-900">Guest Assistant</h1>
        <p className="mt-2 text-sm text-ink-500">Frontend is set up and ready to build on.</p>
        <p className="mt-4 truncate rounded-lg bg-brand-50 px-3 py-1.5 text-xs text-brand-700">
          API: {env.apiBaseUrl}
        </p>
      </div>
    </main>
  )
}

export default App

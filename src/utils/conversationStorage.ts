const STORAGE_KEY = 'hotel-guest-assistant:conversation-id'

// Wrapped in try/catch: localStorage can throw (private browsing, blocked site data),
// and losing the saved id should never break the chat, just start a fresh conversation.

export function getStoredConversationId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function setStoredConversationId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // Ignore: the chat still works, it just won't survive a refresh.
  }
}

export function clearStoredConversationId(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore, see above.
  }
}

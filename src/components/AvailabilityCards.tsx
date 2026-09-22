import type { AvailabilityResult } from '@/types/chat'
import { RoomCard } from './RoomCard'

export function AvailabilityCards({ nights, rooms }: AvailabilityResult) {
  if (rooms.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 px-4 py-3 text-xs text-ink-500">
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M16 3v4M8 3v4M3 11h18" />
          <path d="m9 16 2 2 4-4" />
        </svg>
        No rooms match those dates.
      </div>
    )
  }

  return (
    <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
      {rooms.map((room, index) => (
        <RoomCard key={room.room_type_id} room={room} nights={nights} recommended={index === 0} />
      ))}
    </div>
  )
}

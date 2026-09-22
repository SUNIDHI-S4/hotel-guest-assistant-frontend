import type { AvailabilityResult } from '@/types/chat'
import { RoomCard } from './RoomCard'

export function AvailabilityCards({ nights, rooms }: AvailabilityResult) {
  if (rooms.length === 0) return null

  return (
    <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
      {rooms.map((room, index) => (
        <RoomCard key={room.room_type_id} room={room} nights={nights} recommended={index === 0} />
      ))}
    </div>
  )
}

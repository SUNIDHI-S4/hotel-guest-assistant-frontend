import type { RoomAvailability } from '@/types/api'
import { formatCurrency } from '@/utils/currency'

interface RoomCardProps {
  room: RoomAvailability
  nights: number
  recommended?: boolean
}

export function RoomCard({ room, nights, recommended = false }: RoomCardProps) {
  return (
    <div
      className={`w-64 shrink-0 snap-start rounded-2xl border bg-white p-4 shadow-sm ${
        recommended ? 'border-brand-300 ring-1 ring-brand-200' : 'border-brand-100'
      }`}
    >
      {recommended && (
        <span className="mb-2 inline-block rounded-full bg-brand-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
          Recommended
        </span>
      )}
      <p className="text-sm font-semibold text-ink-900">{room.name}</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-500">{room.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-cream-100 px-2 py-0.5 text-[11px] text-ink-700">
          Sleeps {room.max_guests}
        </span>
        {room.breakfast_included && (
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] text-brand-700">
            Breakfast included
          </span>
        )}
      </div>

      <div className="mt-3 border-t border-cream-200 pt-3">
        <p className="text-base font-semibold text-ink-900">
          {formatCurrency(room.price_per_night)}
          <span className="text-xs font-normal text-ink-500"> / night</span>
        </p>
        <p className="text-xs text-ink-500">
          {formatCurrency(room.total_price)} total for {nights} {nights === 1 ? 'night' : 'nights'}
        </p>
      </div>

      <p className="mt-2 text-[11px] text-ink-500">
        {room.rooms_available} {room.rooms_available === 1 ? 'room' : 'rooms'} left
      </p>
    </div>
  )
}

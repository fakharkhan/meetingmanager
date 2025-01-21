"use client"

interface TimeSlotsProps {
  selectedDate: string | null
}

const timeSlots = [
  "8:00pm",
  "8:30pm",
  "9:00pm",
  "9:30pm",
  "10:00pm",
  "10:30pm"
]

export function TimeSlots({ selectedDate }: TimeSlotsProps) {
  if (!selectedDate) return null

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">
        Tuesday, January {selectedDate}
      </h2>
      <div className="grid gap-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            className="w-full p-4 text-center text-primary text-sm font-medium rounded-lg border border-border hover:bg-blue-50 hover:border-blue-100 transition-colors"
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
} 
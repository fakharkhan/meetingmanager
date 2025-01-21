"use client"
import { useState } from "react"

interface TimeSlotsProps {
  selectedDate: string | null
}

const timeSlots = [
  "6:00pm",
  "6:30pm",
  "7:00pm",
  "7:30pm",
  "8:00pm",
  "8:30pm",
  "9:00pm",
  "9:30pm",
  "10:00pm"
]

export function TimeSlots({ selectedDate }: TimeSlotsProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  if (!selectedDate) return null

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">
        Tuesday, January {selectedDate}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`w-full py-2 text-center text-sm font-medium rounded-lg border transition-colors ${
              selectedTime === time
                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                : "text-primary border-blue-200 hover:bg-blue-50 hover:border-blue-300"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
} 
"use client"
import { useState, useEffect } from "react"
import { convertTimeToTimeZone } from "@/lib/time-zone-utils"

interface TimeSlotsProps {
  selectedDate: string | null
  selectedTimeZone: string
  onTimeSelect?: () => void
}

const defaultTimeSlots = [
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

export function TimeSlots({ selectedDate, selectedTimeZone, onTimeSelect }: TimeSlotsProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [convertedTimeSlots, setConvertedTimeSlots] = useState<string[]>([])

  useEffect(() => {
    if (selectedTimeZone) {
      const converted = defaultTimeSlots.map(time => {
        const convertedTime = convertTimeToTimeZone(time, "Asia/Karachi", selectedTimeZone);
        return convertedTime || time; // Fallback to original time if conversion fails
      });
      setConvertedTimeSlots(converted);
      
      // Select the first available time slot when time zone changes
      if (converted.length > 0) {
        setSelectedTime(converted[0]);
      }
    }
  }, [selectedTimeZone])

  useEffect(() => {
    // Select the first available time slot when date is selected
    if (selectedDate && convertedTimeSlots.length > 0) {
      setSelectedTime(convertedTimeSlots[0]);
    }
  }, [selectedDate, convertedTimeSlots])

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onTimeSelect?.();
  }

  if (!selectedDate) return null

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">
        Tuesday, January {selectedDate}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {convertedTimeSlots.map((time, index) => (
          <button
            key={`${index}-${time}`}
            onClick={() => handleTimeSelect(time)}
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
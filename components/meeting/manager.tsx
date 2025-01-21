"use client"

import { useState } from "react"
import { Profile } from "@/components/meeting/profile"
import { Calendar } from "@/components/meeting/calendar"
import { Card } from "@/components/ui/card"

export function Manager() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedMeetingType, setSelectedMeetingType] = useState<"online" | "phone" | "in-person" | null>(null)

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex items-start gap-2 transition-all duration-500 ease-in-out">
        <div className={`w-[360px] transition-all duration-500 ${
          selectedMeetingType ? '-translate-x-0' : 'translate-x-[calc(50%-180px)]'
        }`}>
          <Profile onMeetingTypeSelect={setSelectedMeetingType} />
        </div>

        {selectedMeetingType && (
          <div className="transition-all duration-500 animate-in slide-in-from-right">
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedMeetingType={selectedMeetingType}
            />
          </div>
        )}
      </div>
    </div>
  )
} 
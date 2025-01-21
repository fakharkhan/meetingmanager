"use client"

import { useState } from "react"
import { Profile } from "@/components/meeting/profile"
import { Calendar } from "@/components/meeting/calendar"

export function Manager() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedMeetingType, setSelectedMeetingType] = useState<"online" | "phone" | "in-person">("online")

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4 antialiased">
      {/* Profile Section */}
      <Profile onMeetingTypeSelect={setSelectedMeetingType} />

      {/* Calendar Section */}
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedMeetingType={selectedMeetingType}
      />
    </div>
  )
} 
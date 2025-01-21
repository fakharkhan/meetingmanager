"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TimeZoneSelect } from "@/components/meeting/time-zone-select"
import { useState } from "react"

interface CalendarProps {
  selectedDate: string | null
  setSelectedDate: (date: string) => void
  selectedMeetingType: "online" | "phone" | "in-person"
  selectedTimeZone: string
  onTimeZoneChange: (value: string) => void
}

export function Calendar({ 
  selectedDate, 
  setSelectedDate, 
  selectedMeetingType,
  selectedTimeZone,
  onTimeZoneChange
}: CalendarProps) {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
  const dates = Array.from({ length: 31 }, (_, i) => i + 1)
  const availableDates = [21, 22, 23, 24, 27, 28, 29, 30, 31]

  const getMeetingTypeMessage = (type: "online" | "phone" | "in-person") => {
    switch (type) {
      case "online":
        return "Perfect, I will share meeting detail over your email"
      case "phone":
        return "Sure, I will call you back with (385-216-2631)"
      case "in-person":
        return "Great, Let me know if you need location details"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Select a Date & Time</h1>
        <div>
          <p className="text-sm text-muted-foreground italic">{getMeetingTypeMessage(selectedMeetingType)}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold tracking-tight">January 2025</div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-blue-50">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
                {day}
              </div>
            ))}
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date.toString())}
                className={`
                  py-1 rounded-full text-sm font-bold 
                  ${
                    availableDates.includes(date)
                      ? "hover:bg-blue-100 text-primary hover:text-primary-foreground transition-colors"
                      : "text-muted-foreground opacity-50"
                  }
                  ${
                    selectedDate === date.toString() 
                      ? "bg-blue-600 text-white hover:bg-blue-700 font-semibold" 
                      : ""
                  }
                  ${
                    !availableDates.includes(date) 
                      ? "cursor-not-allowed" 
                      : "cursor-pointer"
                  }
                `}
                disabled={!availableDates.includes(date)}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <TimeZoneSelect 
            className="text-sm truncate" 
            value={selectedTimeZone}
            onChange={onTimeZoneChange}
          />
        </div>
      </div>
    </div>
  )
} 
"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TimeZoneSelect } from "@/components/time-zone-select"
import { TimeSlots } from "@/components/time-slots"

export default function MeetingScheduler() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
  const dates = Array.from({ length: 31 }, (_, i) => i + 1)
  const availableDates = [21, 22, 23, 24, 27, 28, 29, 30, 31]

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4 antialiased">
      {/* Left Section */}
      <Card className="flex-1 p-6 space-y-6">
        <div className="space-y-4">
          <div className="w-full h-[120px] relative mb-2">
            <Image
              src="/uploads/softpyramid-banner.jpeg"
              alt="SoftPyramid Banner"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="flex items-center gap-4 mt-8">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-offset-2 ring-gray-100">
              <Image
                src="/uploads/FZ.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground tracking-wide uppercase">CEO</div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">Project Insights</h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span className="font-medium">30 min</span>
          </div>

          <p className="text-muted-foreground leading-7">
            Stay updated with the latest innovations, project insights, and custom features. Collaborate with our team,
            discuss tech trends, and ensure seamless integration and quality assurance for your projects.
          </p>
        </div>
      </Card>

      {/* Right Section */}
      <div className="flex-[2] grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Select a Date & Time</h1>

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

              <div className="grid grid-cols-7 gap-2">
                {days.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date.toString())}
                    className={`
                      py-2 rounded-full text-sm font-medium
                      ${
                        availableDates.includes(date)
                          ? "hover:bg-blue-100 text-primary hover:text-primary-foreground transition-colors"
                          : "text-muted-foreground"
                      }
                      ${selectedDate === date.toString() ? "bg-blue-100 text-primary-foreground" : ""}
                    `}
                    disabled={!availableDates.includes(date)}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            <TimeZoneSelect />
          </div>
        </Card>

        {/* Time Slots Section */}
        <div className="h-fit">
          {selectedDate && (
            <Card className="p-6">
              <TimeSlots selectedDate={selectedDate} />
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

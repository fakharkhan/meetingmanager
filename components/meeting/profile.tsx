"use client"

import Image from "next/image"
import { Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { SelectType } from "@/components/meeting/select-type"

interface ProfileProps {
  onMeetingTypeSelect: (type: "online" | "phone" | "in-person" | null) => void
}

export function Profile({ onMeetingTypeSelect }: ProfileProps) {
  return (
    <Card className="flex-1 p-2 space-y-6">
      <div className="space-y-4">
        <div className="w-full h-[120px] relative mb-2">
          <Image
            src="/uploads/softpyramid-banner.jpeg"
            alt="SoftPyramid Banner"
            fill
            sizes="(max-width: 768px) 100vw, 360px"
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
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground tracking-wide ">You are scheduling with </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Fakhar Zaman Khan</h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-5 h-5" />
          <span className="font-medium">30 min</span>
        </div>

        <div className="space-y-2">
          <label htmlFor="discussion-topic" className="text-sm font-medium text-muted-foreground">
            We will discuss about
          </label>
          <div className="relative">
            <textarea
              id="discussion-topic"
              rows={4}
              className="w-full min-h-[80px] p-3 rounded-md border border-input bg-background text-sm"
              placeholder="Enter discussion topics and agenda points..."
            />
            <button 
              className="absolute bottom-3 right-3 p-1.5 rounded-md hover:bg-gray-100 text-muted-foreground"
              aria-label="Attach file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* Select Meeting Type */}
        <SelectType onSelect={onMeetingTypeSelect} />
      </div>
    </Card>
  )
} 
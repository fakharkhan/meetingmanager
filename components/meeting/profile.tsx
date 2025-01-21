"use client"

import Image from "next/image"
import { Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { SelectType } from "@/components/meeting/select-type"

interface ProfileProps {
  onMeetingTypeSelect: (type: "online" | "phone" | "in-person") => void
}

export function Profile({ onMeetingTypeSelect }: ProfileProps) {
  return (
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
      <div>
        {/* Select Meeting Type */}
        <SelectType onSelect={onMeetingTypeSelect} />
      </div>
    </Card>
  )
} 
"use client"

import { useState } from "react"
import { Phone, Video, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

type MeetingType = "online" | "phone" | "in-person"

interface SelectTypeProps {
  onSelect?: (type: MeetingType) => void
}

export function SelectType({ onSelect }: SelectTypeProps) {
  const [selectedType, setSelectedType] = useState<MeetingType>("online")

  const handleSelect = (type: MeetingType) => {
    setSelectedType(type)
    onSelect?.(type)
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Meeting Type</h3>
      <div className="flex gap-2">
        <Button
          variant={selectedType === "online" ? "default" : "outline"}
          size="sm"
          className="flex-1"
          onClick={() => handleSelect("online")}
        >
          <Video className="w-4 h-4 mr-2" />
          Online
        </Button>
        <Button
          variant={selectedType === "phone" ? "default" : "outline"}
          size="sm"
          className="flex-1"
          onClick={() => handleSelect("phone")}
        >
          <Phone className="w-4 h-4 mr-2" />
          Phone
        </Button>
        <Button
          variant={selectedType === "in-person" ? "default" : "outline"}
          size="sm"
          className="flex-1"
          onClick={() => handleSelect("in-person")}
        >
          <Users className="w-4 h-4 mr-2" />
          In-Person
        </Button>
      </div>
    </div>
  )
} 
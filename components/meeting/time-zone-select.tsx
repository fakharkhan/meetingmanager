"use client"

import { Globe } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const timeZones = [
  { value: "PKT", label: "Pakistan Time (UTC+05:00)", city: "Islamabad" },
  { value: "MVT", label: "Maldives Time (UTC+05:00)", city: "Male" },
  { value: "IST", label: "India Standard Time (UTC+05:30)", city: "New Delhi" },
  { value: "GMT", label: "Greenwich Mean Time (UTC+00:00)", city: "London" },
  { value: "EST", label: "Eastern Standard Time (UTC-05:00)", city: "New York" },
  { value: "PST", label: "Pacific Standard Time (UTC-08:00)", city: "Los Angeles" },
]

export function TimeZoneSelect() {
  return (
    <div className="space-y-2.5">
      <div className="text-sm font-medium text-foreground">Time zone</div>
      <Select defaultValue="PKT">
        <SelectTrigger className="w-full">
          <Globe className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Select timezone" />
        </SelectTrigger>
        <SelectContent>
          {timeZones.map((timezone) => (
            <SelectItem key={timezone.value} value={timezone.value}>
              {timezone.label} - {timezone.city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 
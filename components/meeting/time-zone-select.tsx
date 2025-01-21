"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimeZoneSelectProps {
  className?: string
}

export function TimeZoneSelect({ className }: TimeZoneSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Time zone
      </label>
      <Select defaultValue="Asia/Karachi">
        <SelectTrigger className={`w-full ${className}`}>
          <SelectValue placeholder="Select time zone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="America/New_York">ET - Eastern Time</SelectItem>
          <SelectItem value="America/Chicago">CT - Central Time</SelectItem>
          <SelectItem value="America/Denver">MT - Mountain Time</SelectItem>
          <SelectItem value="America/Los_Angeles">PT - Pacific Time</SelectItem>
          <SelectItem value="Asia/Karachi">PKT - Pakistan Time</SelectItem>
          <SelectItem value="Europe/London">GMT - Greenwich Mean Time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 
"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimeZoneSelectProps {
  className?: string
  value: string
  onChange: (value: string) => void
}

export function TimeZoneSelect({ className, value, onChange }: TimeZoneSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Time zone
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`w-full ${className}`}>
          <SelectValue placeholder="Select time zone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="America/New_York">Eastern Time (UTC-05:00)</SelectItem>
          <SelectItem value="America/Chicago">Central Time (UTC-06:00)</SelectItem>
          <SelectItem value="America/Denver">Mountain Time (UTC-07:00)</SelectItem>
          <SelectItem value="America/Los_Angeles">Pacific Time (UTC-08:00)</SelectItem>
          <SelectItem value="Asia/Karachi">Pakistan Time (UTC+05:00)</SelectItem>
          <SelectItem value="Europe/London">Greenwich Mean Time (UTC+00:00)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 
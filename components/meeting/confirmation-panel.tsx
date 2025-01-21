interface ConfirmationPanelProps {
  formData: {
    name: string
    email?: string
    phone?: string
    countryCode?: string
    discussionTopic: string
    date: string
    time: string
  }
  meetingType: "online" | "phone" | "in-person"
  selectedTimeZone: string
}

export function ConfirmationPanel({ 
  formData, 
  meetingType,
  selectedTimeZone 
}: ConfirmationPanelProps) {
  const getMeetingTypeDetails = () => {
    switch (meetingType) {
      case "online":
        return {
          title: "Online Meeting",
          detail: `Meeting link will be sent to ${formData.email}`
        }
      case "phone":
        return {
          title: "Phone Call",
          detail: `We'll call you at ${formData.countryCode} ${formData.phone}`
        }
      case "in-person":
        return {
          title: "In-Person Meeting",
          detail: "Location details will be shared via email"
        }
    }
  }

  const meetingDetails = getMeetingTypeDetails()

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Meeting Confirmed! 🎉</h2>
          <p className="text-muted-foreground">
            Your meeting has been scheduled successfully.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">{meetingDetails.title}</h3>
            <p className="text-sm text-muted-foreground">{meetingDetails.detail}</p>
          </div>

          <div className="space-y-4 border rounded-lg p-4">
            <div>
              <div className="text-sm font-medium">Date & Time</div>
              <div className="text-sm text-muted-foreground">
                {formData.date}
              </div>
              <div className="text-sm text-muted-foreground">
                {formData.time}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Timezone: {selectedTimeZone}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium">Attendee</div>
              <div className="text-sm text-muted-foreground">{formData.name}</div>
              {formData.email && (
                <div className="text-sm text-muted-foreground mt-1">
                  {formData.email}
                </div>
              )}
              {formData.phone && (
                <div className="text-sm text-muted-foreground mt-1">
                  {formData.countryCode} {formData.phone}
                </div>
              )}
            </div>

            {formData.discussionTopic && (
              <div>
                <div className="text-sm font-medium">Discussion Topics</div>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {formData.discussionTopic}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6">
          <p className="text-sm text-center text-muted-foreground">
            A calendar invitation has been sent to your {meetingType === 'online' ? 'email' : 'contact details'}.
          </p>
        </div>
      </div>
    </div>
  )
} 
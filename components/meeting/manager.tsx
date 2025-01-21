"use client"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Profile } from "@/components/meeting/profile"
import { Calendar } from "@/components/meeting/calendar"
import { Card } from "@/components/ui/card"
import { TimeSlots } from "@/components/meeting/time-slots"
import { ContactForm } from "@/components/meeting/contact-form"
import { NavigationArrows } from "@/components/meeting/navigation"
import { ConfirmationPanel } from "@/components/meeting/confirmation-panel"

type MeetingType = "online" | "phone" | "in-person" | null
type PanelType = 'profile' | 'calendar' | 'timeSlots' | 'confirmation'

interface PanelRenderProps {
  panelType: PanelType
  isMobile?: boolean
}

interface TimeSlotPanelProps {
  selectedDate: string
  selectedTimeZone: string
  selectedMeetingType: Exclude<MeetingType, null>
  onBack: () => void
  discussionTopic: string
  onSubmit: (formData: {
    name: string
    email?: string
    phone?: string
    countryCode?: string
    discussionTopic: string
    date: string
    time: string
  }) => void
}

function TimeSlotPanel({ 
  selectedDate, 
  selectedTimeZone,
  selectedMeetingType,
  onBack,
  discussionTopic,
  onSubmit
}: TimeSlotPanelProps) {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-6">
        <TimeSlots 
          selectedDate={selectedDate} 
          selectedTimeZone={selectedTimeZone}
          onTimeSelect={(time) => {
            setSelectedTime(time)
            setTimeout(() => {
              nameInputRef.current?.focus()
            }, 100)
          }}
        />
        <div className="h-4" />
        <ContactForm 
          selectedMeetingType={selectedMeetingType}
          nameInputRef={nameInputRef as React.RefObject<HTMLInputElement>}
          selectedDate={selectedDate}
          selectedTime={selectedTime || ""}
          discussionTopic={discussionTopic}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}

export function Manager() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedMeetingType, setSelectedMeetingType] = useState<MeetingType>(null)
  const [activePanel, setActivePanel] = useState<PanelType>('profile')
  const [selectedTimeZone, setSelectedTimeZone] = useState("Asia/Karachi")
  const [discussionTopic, setDiscussionTopic] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const [submittedData, setSubmittedData] = useState<{
    name: string
    email?: string
    phone?: string
    countryCode?: string
    discussionTopic: string
    date: string
    time: string
  } | null>(null)

  // Update active panel based on selections
  useEffect(() => {
    if (selectedMeetingType) {
      setActivePanel('calendar')
    }
    if (selectedDate) {
      setActivePanel('timeSlots')
    }
  }, [selectedMeetingType, selectedDate])

  const handleBack = () => {
    if (activePanel === 'timeSlots') {
      setActivePanel('calendar')
      setSelectedDate(null)
    } else if (activePanel === 'calendar') {
      setActivePanel('profile')
      setSelectedMeetingType(null)
    }
  }

  // Handle swipe gestures
  const touchStart = useRef<number>(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart.current - touchEnd

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) { // Swipe left
        if (activePanel === 'profile' && selectedMeetingType) {
          setActivePanel('calendar')
        } else if (activePanel === 'calendar' && selectedDate) {
          setActivePanel('timeSlots')
        }
      } else { // Swipe right
        handleBack()
      }
    }
  }

  const handleNext = () => {
    if (activePanel === 'profile' && selectedMeetingType) {
      setActivePanel('calendar')
    } else if (activePanel === 'calendar' && selectedDate) {
      setActivePanel('timeSlots')
    }
  }

  const handleFormSubmit = async (formData: {
    name: string
    email?: string
    phone?: string
    countryCode?: string
    discussionTopic: string
    date: string
    time: string
  }) => {
    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted with data:', formData)
      
      // Store the submitted data
      setSubmittedData(formData)
      
      // Move to confirmation panel
      setActivePanel('confirmation')
      
      // Example API call:
      // await fetch('/api/schedule-meeting', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const renderPanel = ({ panelType, isMobile = false }: PanelRenderProps) => {
    const cardClassName = isMobile 
      ? "w-full h-full rounded-none shadow-none"
      : "h-[520px] transition-shadow duration-200"

    switch (panelType) {
      case 'profile':
        return (
          <Card className={cardClassName}>
            <div className="w-full h-[120px] relative">
              <Image
                src="/uploads/softpyramid-banner.jpeg"
                alt="SoftPyramid Banner"
                fill
                sizes={isMobile ? "100vw" : "360px"}
                className="object-contain"
                priority
              />
            </div>
            <Profile 
              onMeetingTypeSelect={setSelectedMeetingType}
              discussionTopic={discussionTopic}
              onDiscussionTopicChange={setDiscussionTopic}
            />
          </Card>
        );

      case 'calendar':
        if (!selectedMeetingType) return null;
        return (
          <Card className={cardClassName}>
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedMeetingType={selectedMeetingType}
              selectedTimeZone={selectedTimeZone}
              onTimeZoneChange={setSelectedTimeZone}
            />
          </Card>
        );

      case 'timeSlots':
        if (!selectedDate || !selectedMeetingType) return null;
        return (
          <Card className={cardClassName}>
            <TimeSlotPanel
              selectedDate={selectedDate}
              selectedTimeZone={selectedTimeZone}
              selectedMeetingType={selectedMeetingType}
              onBack={() => setSelectedDate(null)}
              discussionTopic={discussionTopic}
              onSubmit={handleFormSubmit}
            />
          </Card>
        );

      case 'confirmation':
        if (!submittedData || !selectedMeetingType) return null
        return (
          <Card className={cardClassName}>
            <ConfirmationPanel
              formData={submittedData}
              meetingType={selectedMeetingType}
              selectedTimeZone={selectedTimeZone}
            />
          </Card>
        )
    }
  };

  return (
    <div className="fixed inset-0 flex items-start md:items-center justify-center">
      <div className="w-full h-full md:h-auto md:w-auto">
        {/* Mobile Layout */}
        <div 
          className="relative w-full h-full md:hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <NavigationArrows 
            onNext={handleNext}
            onPrev={handleBack}
            activePanel={activePanel}
            canGoNext={
              (activePanel === 'profile' && selectedMeetingType !== null) ||
              (activePanel === 'calendar' && selectedDate !== null)
            }
            showNavigation={activePanel !== 'confirmation'}
          />

          <div 
            className="absolute inset-0 flex transition-transform duration-300"
            style={{ 
              transform: activePanel === 'confirmation' 
                ? 'translateX(-300%)' 
                : `translateX(${
                    activePanel === 'profile' ? '0' : 
                    activePanel === 'calendar' ? '-100%' : 
                    activePanel === 'timeSlots' ? '-200%' : '-300%'
                  })`
            }}
          >
            <div className="min-w-full min-h-screen flex items-start pt-16">
              <div className="min-w-full h-[85vh] flex-shrink-0">
                {renderPanel({ panelType: 'profile', isMobile: true })}
              </div>
              <div className="min-w-full h-[85vh] flex-shrink-0">
                {renderPanel({ panelType: 'calendar', isMobile: true })}
              </div>
              <div className="min-w-full h-[85vh] flex-shrink-0">
                {renderPanel({ panelType: 'timeSlots', isMobile: true })}
              </div>
              <div className="min-w-full h-[85vh] flex-shrink-0">
                {renderPanel({ panelType: 'confirmation', isMobile: true })}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-start justify-center gap-4 transition-all duration-500 ease-in-out">
          {/* Profile Panel */}
          <div className={`w-[360px] transition-all duration-500 ${
            activePanel === 'confirmation' ? 'hidden' :
            selectedMeetingType ? '' : 'flex justify-center'
          }`}>
            {renderPanel({ panelType: 'profile' })}
          </div>

          {/* Calendar Panel */}
          <div className={`w-[360px] transition-all duration-500 ${
            activePanel === 'confirmation' ? 'hidden' :
            selectedMeetingType 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95 pointer-events-none absolute'
          }`}>
            {renderPanel({ panelType: 'calendar' })}
          </div>

          {/* Time Slots Panel */}
          <div className={`w-[360px] transition-all duration-500 ${
            activePanel === 'confirmation' ? 'hidden' :
            selectedDate && selectedMeetingType 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95 pointer-events-none absolute'
          }`}>
            {renderPanel({ panelType: 'timeSlots' })}
          </div>

          {/* Confirmation Panel */}
          <div className={`w-[360px] transition-all duration-500 ${
            activePanel === 'confirmation' 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95 pointer-events-none absolute'
          }`}>
            {renderPanel({ panelType: 'confirmation' })}
          </div>
        </div>
      </div>
    </div>
  )
} 
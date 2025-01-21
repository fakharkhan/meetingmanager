import { ChevronLeft, ChevronRight } from "lucide-react"

type PanelType = 'profile' | 'calendar' | 'timeSlots'

interface NavigationArrowsProps {
  onNext?: () => void
  onPrev?: () => void
  activePanel: PanelType
  canGoNext: boolean
}

export function NavigationArrows({ 
  onNext, 
  onPrev, 
  activePanel,
  canGoNext
}: NavigationArrowsProps) {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 md:hidden">
      {activePanel === 'profile' && canGoNext && (
        <button 
          onClick={onNext}
          className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 active:scale-95 transition-transform"
          aria-label="Next"
        >
          <ChevronRight className="w-8 h-8 text-blue-600" />
        </button>
      )}

      {activePanel === 'calendar' && (
        <div className="flex gap-6">
          <button 
            onClick={onPrev}
            className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 active:scale-95 transition-transform"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8 text-blue-600" />
          </button>
          {canGoNext && (
            <button 
              onClick={onNext}
              className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 active:scale-95 transition-transform"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8 text-blue-600" />
            </button>
          )}
        </div>
      )}

      {activePanel === 'timeSlots' && (
        <button 
          onClick={onPrev}
          className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 active:scale-95 transition-transform"
          aria-label="Previous"
        >
          <ChevronLeft className="w-8 h-8 text-blue-600" />
        </button>
      )}
    </div>
  )
} 
import React from 'react'
import { Emotion } from '../types'
import { Button } from './ui/button'
import { ChevronUp } from 'lucide-react'

interface EmotionSelectorProps {
  emotions: Emotion[]
  selectedEmotions: Record<string, number>
  toggleEmotion: (emotion: Emotion) => void
  incrementEmotion: (emotion: Emotion) => void
  colorClass: string
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ 
  emotions, 
  selectedEmotions, 
  toggleEmotion, 
  incrementEmotion,
  colorClass 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {emotions.map(emotion => {
        const isSelected = selectedEmotions[emotion.name] > 0
        return (
          <div key={emotion.name} className="relative">
            <Button
              onClick={() => toggleEmotion(emotion)}
              variant={isSelected ? "default" : "outline"}
              className={`${isSelected ? colorClass : ""} ${isSelected ? 'pr-8' : ''}`}
            >
              {emotion.name}
              {isSelected && (
                <span className="ml-2 bg-background text-foreground rounded-full px-1.5 text-xs">
                  {selectedEmotions[emotion.name]}
                </span>
              )}
            </Button>
            {isSelected && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 bottom-0 px-1"
                onClick={(e) => {
                  e.stopPropagation()
                  incrementEmotion(emotion)
                }}
              >
                <ChevronUp size={14} />
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default EmotionSelector
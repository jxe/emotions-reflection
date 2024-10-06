import React, { useState } from 'react'
import { Emotion, JournalEntry } from '../types'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

interface QuestionDisplayProps {
  selectedEmotions: Emotion[]
  addJournalEntry: (entry: JournalEntry) => void
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ selectedEmotions, addJournalEntry }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswerChange = (emotionName: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [emotionName]: answer }))
  }

  const handleSubmit = (emotion: Emotion) => {
    const answer = answers[emotion.name] || ''
    if (answer.trim()) {
      addJournalEntry({
        emotion: emotion.name,
        question: emotion.question,
        answer: answer.trim(),
        timestamp: new Date().toISOString(),
      })
      setAnswers(prev => ({ ...prev, [emotion.name]: '' }))
    }
  }

  if (selectedEmotions.length === 0) {
    return <p className="text-muted-foreground">Select emotions to see related questions.</p>
  }

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6">Reflect on your emotions:</h2>
      {selectedEmotions.map(emotion => (
        <div key={emotion.name} className="mb-8 bg-card p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium mb-3 text-primary">{emotion.name}</h3>
          <p className="mb-4 text-muted-foreground">{emotion.question}</p>
          <Textarea
            value={answers[emotion.name] || ''}
            onChange={e => handleAnswerChange(emotion.name, e.target.value)}
            className="mb-4"
            rows={4}
            placeholder="Your answer..."
          />
          <Button onClick={() => handleSubmit(emotion)}>
            Submit Reflection
          </Button>
        </div>
      ))}
    </div>
  )
}

export default QuestionDisplay
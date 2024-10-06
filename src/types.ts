export interface Emotion {
  name: string
  question: string
}

export interface JournalEntry {
  emotion: string
  question: string
  answer: string
  timestamp: string
  intensity?: number
}
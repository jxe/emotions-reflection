import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion"
import EmotionSelector from './components/EmotionSelector'
import QuestionDisplay from './components/QuestionDisplay'
import JournalDisplay from './components/JournalDisplay'
import { Emotion, JournalEntry } from './types'
import { Heart, Frown, Book } from 'lucide-react'

const negativeEmotions: Emotion[] = [
  { name: 'Sadness', question: 'What way of living was lost?' },
  { name: 'Shame', question: 'What way of living did you not live up to?' },
  { name: 'Anger', question: 'What way of living is being blocked by what external force?' },
  { name: 'Fear', question: 'What way of living is threatened?' },
  { name: 'Disgust', question: 'What way of living is being violated?' },
  { name: 'Regret', question: 'What way of living do you wish you had chosen?' },
  { name: 'Bitterness', question: 'What way of living feels unfairly denied to you?' },
  { name: 'Humiliation', question: 'What way of living did you feel permanently incapable of?' },
  { name: 'Loneliness', question: 'What type of connection was unavailable?' },
  { name: 'Confusion', question: 'What way of living was out of focus?' },
]

const positiveEmotions: Emotion[] = [
  { name: 'Joy', question: 'What way of living has opened up?' },
  { name: 'Love', question: 'What way of living feels deeply fulfilling and connected?' },
  { name: 'Gratitude', question: 'What way of living are you thankful for?' },
  { name: 'Hope', question: 'What way of living do you look forward to?' },
  { name: 'Pride', question: 'What way of living reflects your achievements?' },
]

function App() {
  const [selectedEmotions, setSelectedEmotions] = useState<Record<string, number>>({})
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])

  const toggleEmotion = (emotion: Emotion) => {
    setSelectedEmotions(prev => {
      const newEmotions = { ...prev }
      if (newEmotions[emotion.name]) {
        delete newEmotions[emotion.name]
      } else {
        newEmotions[emotion.name] = 1
      }
      return newEmotions
    })
  }

  const incrementEmotion = (emotion: Emotion) => {
    setSelectedEmotions(prev => ({
      ...prev,
      [emotion.name]: (prev[emotion.name] || 0) + 1
    }))
  }

  const addJournalEntry = (entry: JournalEntry) => {
    setJournalEntries(prev => [...prev, entry])
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">Emotion Reflection App</h1>
      </header>
      <main className="flex-1 overflow-y-auto">
        <Tabs defaultValue="emotions" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="emotions" className="flex-1"><Heart className="mr-2" />Emotions</TabsTrigger>
            <TabsTrigger value="reflections" className="flex-1"><Frown className="mr-2" />Reflections</TabsTrigger>
            <TabsTrigger value="journal" className="flex-1"><Book className="mr-2" />Journal</TabsTrigger>
          </TabsList>
          <TabsContent value="emotions" className="p-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="negative">
                <AccordionTrigger>Negative Emotions</AccordionTrigger>
                <AccordionContent>
                  <EmotionSelector
                    emotions={negativeEmotions}
                    selectedEmotions={selectedEmotions}
                    toggleEmotion={toggleEmotion}
                    incrementEmotion={incrementEmotion}
                    colorClass="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="positive">
                <AccordionTrigger>Positive Emotions</AccordionTrigger>
                <AccordionContent>
                  <EmotionSelector
                    emotions={positiveEmotions}
                    selectedEmotions={selectedEmotions}
                    toggleEmotion={toggleEmotion}
                    incrementEmotion={incrementEmotion}
                    colorClass="bg-primary text-primary-foreground hover:bg-primary/90"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="reflections" className="p-4">
            <QuestionDisplay 
              selectedEmotions={Object.keys(selectedEmotions).map(name => 
                negativeEmotions.concat(positiveEmotions).find(e => e.name === name)!
              )} 
              addJournalEntry={addJournalEntry} 
            />
          </TabsContent>
          <TabsContent value="journal" className="p-4">
            <JournalDisplay journalEntries={journalEntries} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App
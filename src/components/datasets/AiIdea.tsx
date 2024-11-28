'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

interface AISession {
  promptStreaming: (prompt: string) => AsyncIterable<string>
}

interface AILanguageModel {
  capabilities: () => Promise<any>
  create: (options: { temperature: number; topK: number }) => Promise<AISession>
}

interface AIInterface {
  languageModel: AILanguageModel
}

interface SongIdea {
  title: string
  concept: string
}

declare global {
  interface Window {
    ai?: AIInterface
  }
}

export default function AiSongIdeaGenerator() {
  const [theme, setTheme] = useState<string>('')
  const [ideas, setIdeas] = useState<SongIdea[]>([])
  const [session, setSession] = useState<AISession | null>(null)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const initializeSession = async () => {
      if (!window.ai?.languageModel) {
        setError("Your browser doesn't support the Prompt API.")
        return
      }

      try {
        const newSession = await window.ai.languageModel.create({
          temperature: 0.7,
          topK: 40,
        })
        setSession(newSession)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        setError(`Initialization error: ${errorMessage}`)
      }
    }

    initializeSession()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!theme.trim()) return

    setIdeas([])
    setIsLoading(true)
    setError('')

    const prompt = `Generate a list of 5 unique potential song ideas based on the theme: "${theme}". For each idea, provide a title and a brief concept. Format each idea as "Title: [Song Title] | Concept: [Brief Concept]" on a new line. Ensure each idea is distinct and creative.`

    try {
      if (!session) {
        throw new Error('Session not initialized')
      }

      const stream = await session.promptStreaming(prompt)
      let fullResponse = ''

      const timeout = setTimeout(() => {
        if (isLoading) {
          setError('Response timeout. Please try again.')
          setIsLoading(false)
        }
      }, 30000)

      for await (const chunk of stream) {
        fullResponse += chunk
        const formattedIdeas = formatIdeas(fullResponse)
        setIdeas(formattedIdeas)
      }

      clearTimeout(timeout)
      setIsLoading(false)
      setTheme('')
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`)
      setIsLoading(false)
    }
  }

  const formatIdeas = (response: string): SongIdea[] => {
    const lines = response.split('\n').filter(line => line.trim() !== '')
    const formattedIdeas: SongIdea[] = []
    const seenTitles = new Set<string>()

    for (const line of lines) {
      const parts = line.split('|').map(part => part.trim())
      if (parts.length === 2) {
        const titlePart = parts[0].split(':')
        const conceptPart = parts[1].split(':')
        if (titlePart.length === 2 && conceptPart.length === 2) {
          const title = titlePart[1].trim()
          const concept = conceptPart[1].trim()
          if (title && concept && !seenTitles.has(title)) {
            formattedIdeas.push({ title, concept })
            seenTitles.add(title)
          }
        }
      }
      if (formattedIdeas.length === 5) break
    }

    return formattedIdeas
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-3xl">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Song <span className="text-yellow-400">Inspiration</span> 
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xl font-bold block text-white">
              What theme would you like song ideas about?
            </label>
            <Input
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Enter a theme (e.g., love, nature, adventure)..."
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !theme.trim()}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Generating Ideas...
              </div>
            ) : (
              'Generate Ideas'
            )}
          </Button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {ideas.length > 0 && (
          <div className="mt-6 p-6 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Generated Song Ideas</h2>
            <div className="space-y-4">
              {ideas.map((idea, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {idea.concept}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


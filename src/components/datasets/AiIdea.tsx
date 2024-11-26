'use client'

import { useState, useEffect, FormEvent } from 'react'

interface AICapabilities {
  defaultTemperature: number;
  defaultTopK: number;
}

interface AISession {
  promptStreaming: (prompt: string) => AsyncIterable<string>;
}

interface AILanguageModel {
  capabilities: () => Promise<AICapabilities>;
  create: (options: { temperature: number; topK: number }) => Promise<AISession>;
}

interface AIInterface {
  languageModel: AILanguageModel;
}

declare global {
  interface Window {
    ai?: AIInterface;
  }
}

interface SongIdea {
  title: string;
  concept: string;
}

export default function AiSongIdeaGenerator() {
  const [theme, setTheme] = useState<string>('')
  const [ideas, setIdeas] = useState<SongIdea[]>([])
  const [session, setSession] = useState<AISession | null>(null)
  const [temperature, setTemperature] = useState<number>(0.7)
  const [topK, setTopK] = useState<number>(10)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const updateSession = async () => {
    try {
      if (!window.ai || !window.ai.languageModel) {
        throw new Error("AI language model not available")
      }
      const newSession = await window.ai.languageModel.create({
        temperature,
        topK,
      })
      setSession(newSession)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(`Session error: ${errorMessage}`)
    }
  }

  useEffect(() => {
    const initializeSession = async () => {
      if (!window.ai || !window.ai.languageModel) {
        setError("Your browser doesn't support the Prompt API.")
        return
      }

      try {
        const { defaultTemperature, defaultTopK } = await window.ai.languageModel.capabilities()
        setTemperature(defaultTemperature)
        setTopK(defaultTopK)
        await updateSession()
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        setError(`Initialization error: ${errorMessage}`)
      }
    }

    initializeSession()
}, [updateSession]);

  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!theme.trim()) {
      return
    }

    setIdeas([])
    setIsLoading(true)
    setError('')

    const prompt = `Generate a list of 5 unique potential song ideas based on the theme: "${theme}". For each idea, provide a title and a brief concept. Format each idea as "Title: [Song Title] | Concept: [Brief Concept]" on a new line. Ensure each idea is distinct and creative.`

    try {
      if (!session) {
        await updateSession()
      }

      if (!session) {
        throw new Error("Failed to create a session")
      }

      const stream = await session.promptStreaming(prompt)
      let fullResponse = ''

      const timeout = setTimeout(() => {
        if (isLoading) {
          setError('Response timeout, the AI took too long to respond.')
          setIsLoading(false)
        }
      }, 30000) // Timeout after 30 seconds

      for await (const chunk of stream) {
        fullResponse += chunk
        const formattedIdeas = formatIdeas(fullResponse)
        setIdeas(formattedIdeas)
      }

      clearTimeout(timeout)
      setIsLoading(false)
      setTheme('')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(`Error: ${errorMessage}`)
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
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-gradient-to-br from-blue-600 to-blue-300 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-white">Song Idea Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter a theme for your song ideas"
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`w-full p-2 rounded-md text-white font-semibold ${
            isLoading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Generating Ideas...' : 'Generate Song Ideas'}
        </button>
      </form>
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}
      {ideas.length > 0 && (
        <div className="p-4 bg-white rounded-md shadow">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Song Ideas:</h2>
          <ul className="list-disc pl-5 space-y-4">
            {ideas.map((idea, index) => (
              <li key={index} className="text-gray-800">
                <strong>{idea.title}</strong>
                <br />
                <span className="text-sm text-gray-600">{idea.concept}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}


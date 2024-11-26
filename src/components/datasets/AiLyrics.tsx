'use client';

import { useState, useEffect, FormEvent, useCallback } from 'react';
import ChatInput from '../buttons/ChatSubmitt';

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

export default function AiLyricGenerator() {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [session, setSession] = useState<AISession | null>(null);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [topK, setTopK] = useState<number>(10);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [maxWords, setMaxWords] = useState<number>(100);
  const [repetitionThreshold] = useState<number>(3);

  // Memoize the `updateSession` function to avoid recreating it unnecessarily
  const updateSession = useCallback(async () => {
    try {
      if (!window.ai || !window.ai.languageModel) {
        throw new Error('AI language model not available');
      }
      const newSession = await window.ai.languageModel.create({
        temperature,
        topK,
      });
      setSession(newSession);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`Session error: ${errorMessage}`);
    }
  }, [temperature, topK]); // Dependencies: only changes when `temperature` or `topK` changes

  useEffect(() => {
    const initializeSession = async () => {
      if (!window.ai || !window.ai.languageModel) {
        setError("Your browser doesn't support the Prompt API.");
        return;
      }

      try {
        const { defaultTemperature, defaultTopK } = await window.ai.languageModel.capabilities();
        setTemperature(defaultTemperature);
        setTopK(defaultTopK);
        await updateSession();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`Initialization error: ${errorMessage}`);
      }
    };

    initializeSession();
  }, [updateSession]); // `updateSession` is now correctly included as a dependency

  const detectRepetition = (text: string, threshold: number): boolean => {
    const words = text.split(/\s+/);
    const lastNWords = words.slice(-threshold);
    const previousNWords = words.slice(-2 * threshold, -threshold);
    return JSON.stringify(lastNWords) === JSON.stringify(previousNWords);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      return;
    }

    setResponse('');
    setIsLoading(true);
    setError('');

    const lyricsPrompt = `Write a song in English with lyrics based on the following prompt. Make sure it has a clear structure with verses and a chorus if applicable. Do not exceed 500 words: ${prompt}`;

    try {
      if (!session) {
        await updateSession();
      }

      if (!session) {
        throw new Error('Failed to create a session');
      }

      const stream = await session.promptStreaming(lyricsPrompt);
      let fullResponse = '';
      let wordCount = 0;
      let repetitionCount = 0;

      const timeout = setTimeout(() => {
        if (isLoading) {
          setError('Response timeout, the AI took too long to respond.');
          setIsLoading(false);
        }
      }, 30000); // Timeout after 30 seconds

      for await (const chunk of stream) {
        fullResponse += chunk;
        const words = fullResponse.trim().split(/\s+/);
        wordCount = words.length;

        if (wordCount >= maxWords) {
          break;
        }

        if (detectRepetition(fullResponse, repetitionThreshold)) {
          repetitionCount++;
          if (repetitionCount >= 2) {
            break;
          }
        } else {
          repetitionCount = 0;
        }

        setResponse(fullResponse.trim());
      }

      clearTimeout(timeout);
      setIsLoading(false);
      setPrompt('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`Error: ${errorMessage}`);
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-4 bg-gradient-to-br from-blue-600 to-blue-300 rounded">
      <h1 className="text-2xl font-bold text-center mb-4">Lyric <span className="text-yellow-400">Generator</span></h1>
      <div className="space-y-4">
        <ChatInput
          prompt={prompt}
          setPrompt={setPrompt}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />

        <div className="flex flex-col md:flex-row  gap-8 justify-center">
          <div className="flex flex-col">
            <label className="block text-lg font-bold mb-2 mr-8" htmlFor="temperature">
              Creativity: 
              {temperature <= 0.2 ? (
                <span className="text-red-500"> Greedy!</span>
              ) : temperature <= 0.35 ? (
                <span className="text-orange-500"> Low</span>
              ) : temperature <= 0.6 ? (
                <span className="text-orange-300"> Medium</span>
              ) : temperature <= 0.9 ? (
                <span className="text-green-400"> High</span>
              ) : (
                <span className="text-green-100"> Too Creative!</span>
              )}
            </label>
            <input
              type="range"
              id="temperature"
              min="0"
              max="1"
              step="0.01"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              style={{ width: '250px' }}
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-lg font-bold mb-2" htmlFor="topK">
              Riskiness:
              {topK <= 5 ? (
                <span className="text-red-500"> Safe</span>
              ) : topK <= 15 ? (
                <span className="text-orange-500"> Low</span>
              ) : topK <= 30 ? (
                <span className="text-orange-300"> Medium</span>
              ) : topK <=  45? (
                <span className="text-green-400"> High</span>
              ) : (
                <span className="text-green-100"> Too Risky!</span>
              )}
            </label>
            <input
              type="range"
              id="topK"
              min="1"
              max="50"
              step="1"
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              style={{ width: '200px' }}
              className=""
            />
          </div>
          <div className="flex flex-col items-center flex-grow">
            <label className="block text-lg font-bold mb-2" htmlFor="maxWords">
              Words: {maxWords}
            </label>
            <input
              type="range"
              id="maxWords"
              min="50"
              max="500"
              step="10"
              value={maxWords}
              onChange={(e) => setMaxWords(Number(e.target.value))}
              className=""
              style={{ width: '100px' }}
            />
          </div>
        </div>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      {response && (
        <div className="mt-4 p-4 bg-purple-300 rounded">
          <pre className="whitespace-pre-wrap font-serif">{response}</pre>
        </div>
      )}

    </div>
  )
}
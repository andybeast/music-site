'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Textarea } from '@/src/components/ui/textarea';

interface AISession {
  promptStreaming: (prompt: string) => AsyncIterable<string>;
}

interface ModelCapabilities {
  supportedLanguages: string[];
  features: string[];
  [key: string]: unknown; // Add other properties as needed
}

interface AILanguageModel {
  capabilities: () => Promise<ModelCapabilities>;
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
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completeResponse, setCompleteResponse] = useState<string>('');

  useEffect(() => {
    const initializeSession = async () => {
      if (!window.ai?.languageModel) {
        setError("Your browser doesn't support the Prompt API.");
        return;
      }

      try {
        const newSession = await window.ai.languageModel.create({
          temperature: 0.7,
          topK: 40,
        });
        setSession(newSession);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`Initialization error: ${errorMessage}`);
      }
    };

    initializeSession();
  }, []);

  // Process the complete response after streaming is done
  useEffect(() => {
    if (completeResponse && !isLoading) {
      const cleanedResponse = cleanLyrics(completeResponse);
      setResponse(cleanedResponse);
    }
  }, [completeResponse, isLoading]);

  const cleanLyrics = (text: string): string => {
    // First, remove all parentheses and their contents
    let cleaned = text.replace(/$$[^)]*$$/g, '');
    
    // Split into lines and remove duplicates
    const uniqueLines = Array.from(new Set(cleaned.split('\n')));
    
    // Process each line
    const processedLines = uniqueLines
      .map(line => line.trim())
      .filter(line => {
        // Keep lines that are either section headers [Verse], [Chorus] or non-empty content
        return line.match(/^\[.*\]$/) || (line && !line.includes('(') && !line.includes(')'));
      });

    // Join lines back together with proper spacing
    cleaned = processedLines.join('\n');
    
    // Clean up multiple newlines and trim
    return cleaned
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setResponse('');
    setCompleteResponse('');
    setIsLoading(true);
    setError('');

    const lyricsPrompt = `Write a song with lyrics based on this theme: "${prompt}".  
      Keep it concise with maximum 3 verses.
      Do not use any parentheses or brackets in the response.`;

    try {
      if (!session) {
        throw new Error('Session not initialized');
      }

      const stream = await session.promptStreaming(lyricsPrompt);
      let fullText = '';

      for await (const chunk of stream) {
        fullText += chunk;
        
        // Update the complete response as we receive chunks
        setCompleteResponse(fullText);
        
        // Check if we've exceeded our limit
        const paragraphCount = fullText.split(/\n\s*\n/).length;
        if (paragraphCount > 20) {
          break;
        }
      }

      setIsLoading(false);
      setPrompt('');
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
      setIsLoading(false);
    }
  };

  const formatLyrics = (text: string) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.match(/^\[.*\]$/)) {
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-primary">
            {trimmedLine}
          </h3>
        );
      }
      
      return trimmedLine ? (
        <p key={index} className="my-1 leading-relaxed">
          {trimmedLine}
        </p>
      ) : null;
    }).filter(Boolean);
  };

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
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          Lyric <span className="text-yellow-400">Generator</span> 
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xl font-semibold block text-white">
              What would you like to write a song about?
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your song idea or theme..."
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Generating Lyrics...</span>
              </div>
            ) : (
              'Generate Lyrics'
            )}
          </Button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {response && (
          <div className="mt-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-center mb-4 italic">
                {prompt}
              </h2>
              {formatLyrics(response)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


import React, { ChangeEvent, FormEvent } from 'react';

// Update the props interface to match how it's being used
interface ChatInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  isLoading: boolean;
  // Change this to accept a FormEvent parameter
  onSubmit: (e: FormEvent) => Promise<void> | void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  prompt,
  setPrompt,
  isLoading,
  onSubmit
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={onSubmit}>  {/* Pass the event directly to onSubmit */}
        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md bg-white">
            <div className="flex items-center">
              <input
                id="prompt"
                value={prompt}
                onChange={handleChange}
                placeholder="Enter a theme or topic for your lyrics..."
                className="flex-grow p-4 focus:outline-none text-gray-700 placeholder-gray-400"
                aria-label="Lyrics theme input"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className={`p-2 mx-2 rounded-lg transition-colors duration-200 
                  ${isLoading || !prompt.trim() ? 
                    'bg-gray-100 cursor-not-allowed' : 
                    'hover:bg-gray-100 active:bg-gray-200'}`}
                aria-label={isLoading ? "Composing lyrics" : "Generate lyrics"}
              >
                {isLoading ? (
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin"
                    role="status"
                    aria-label="Loading"
                  />
                ) : (
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-6 h-6 text-gray-600 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M12 3v1.5c4.142 0 7.5 3.358 7.5 7.5 0 4.142-3.358 7.5-7.5 7.5-4.142 0-7.5-3.358-7.5-7.5 0-2.95 1.708-5.512 4.188-6.74l.312-.125V6.75L12 3zm0 3v10.5c2.485 0 4.5-2.015 4.5-4.5S14.485 7.5 12 7.5V6zm0 3v4.5c1.38 0 2.5-1.12 2.5-2.5S13.38 9 12 9z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          {isLoading && (
            <div 
              className="absolute bottom-full left-0 mb-2 text-sm text-gray-500"
              role="status"
              aria-live="polite"
            >
              Composing lyrics...
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
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
                    <path d="M12 2l8 8h-6v8h-4v-8H4l8-8z" />
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
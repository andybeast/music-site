interface TikTokEmbed {
    loadEmbedScript: () => void;
    loadEmbed: (element: HTMLElement) => void;
  }
  
  declare global {
    interface Window {
      TikTok?: TikTokEmbed;
    }
  }
  
  export {};
  
  
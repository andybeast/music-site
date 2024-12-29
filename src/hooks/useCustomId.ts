import { useState, useEffect } from 'react';

export function useCustomId() {
  const [customId, setCustomId] = useState<string | null>(null);

  useEffect(() => {
    // Load customId from localStorage when the component mounts
    const storedCustomId = localStorage.getItem('lastOrderCustomId');
    if (storedCustomId) {
      setCustomId(storedCustomId);
    }
  }, []);

  const saveCustomId = (id: string) => {
    localStorage.setItem('lastOrderCustomId', id);
    setCustomId(id);
  };

  const clearCustomId = () => {
    localStorage.removeItem('lastOrderCustomId');
    setCustomId(null);
  };

  return { customId, saveCustomId, clearCustomId };
}


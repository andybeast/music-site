import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  downloadUrl: string;
  fileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ downloadUrl, fileName }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the file. Please try again.');
    }
  };

  return (
    <button 
      onClick={handleDownload}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
    >
      <Download className="mr-2 h-4 w-4" />
      Download {fileName}
    </button>
  );
};

export default DownloadButton;

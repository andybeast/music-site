'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/successcard'
import { Button } from '@/src/components/ui/button'
import { CheckCircle, Download, Loader2, AlertCircle, RefreshCw } from 'lucide-react'

interface DownloadInfo {
  url: string;
  fileName: string;
}

export default function SuccessConfirmed() {
  const [downloads, setDownloads] = useState<DownloadInfo[]>([])
  const [customId, setCustomId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchDownloadUrls = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    console.log('Fetching download URLs...');

    try {
      const response = await fetch('/api/get-download-urls')
      if (!response.ok) {
        throw new Error(`Failed to fetch download URLs: ${response.statusText}`)
      }
      const data = await response.json()
      console.log('Received download data:', data)

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.downloadUrls && Array.isArray(data.downloadUrls)) {
        setDownloads(data.downloadUrls.map((url: string, index: number) => ({
          url,
          fileName: `LunarBoomAlbum_${index + 1}.zip`
        })))
        setCustomId(data.customId)
      } else {
        throw new Error('Invalid download URL data')
      }
    } catch (err) {
      console.error('Error fetching download URLs:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchDownloadUrls()
  }, [fetchDownloadUrls])

  const handleManualRefresh = () => {
    setIsRefreshing(true)
    fetchDownloadUrls()
  }

  const handleDownload = (url: string, fileName: string) => {
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Download failed:', error);
        // Handle the error (e.g., show an error message to the user)
      });
  };

  if (isLoading && !isRefreshing) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading your download links...</span>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-green-600">
            <CheckCircle className="mr-2" />
            {error ? 'Order Information' : 'Payment Successful!'}
          </CardTitle>
          <CardDescription>
            {error ? 'There was an issue retrieving your order information.' : 'Thank you for your purchase. NOTE! Your download links will expire in 15 minutes'}
            {customId && (
              <span className="block mt-2">
                Your order ID is: <span className="font-semibold">{customId}</span>
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="flex flex-col items-center text-red-500">
              <AlertCircle className="mb-2 h-8 w-8" />
              <p className="text-center mb-4">{error}</p>
              <Button 
                onClick={handleManualRefresh}
                variant="outline"
                className="flex items-center"
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                {isRefreshing ? 'Refreshing...' : 'Try Again'}
              </Button>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-4">Your Downloads:</h3>
              {downloads.length > 0 ? (
                <ul className="space-y-4">
                  {downloads.map((download, index) => (
                    <li key={index}>
                      <Button 
                        onClick={() => handleDownload(download.url, download.fileName)}
                        variant="outline"
                        className="w-full flex items-center justify-start"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download {download.fileName}
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="mb-4">No download links available. Please try refreshing or contact support.</p>
                  <Button 
                    onClick={handleManualRefresh}
                    variant="outline"
                    className="flex items-center"
                    disabled={isRefreshing}
                  >
                    {isRefreshing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    {isRefreshing ? 'Refreshing...' : 'Refresh Download Links'}
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="default"
          >
            Return to Home
          </Button>
          {!error && downloads.length > 0 && (
            <Button 
              onClick={() => window.print()} 
              variant="outline"
            >
              Print Receipt
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}


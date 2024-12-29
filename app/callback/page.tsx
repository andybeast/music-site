'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
  const router = useRouter()

  useEffect(() => {
    const exchangeAuthCode = async (authCode: string) => {
      try {
        const response = await fetch('/api/exchange-auth-code', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code: authCode })
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to exchange authorization code: ${errorText}`)
        }

        const data = await response.json()

        if (data.success) {
          setStatus('success')
          window.dispatchEvent(new CustomEvent('google-auth-success'))
          router.push('/dashboard')
        } else {
          throw new Error("Token exchange response indicated failure")
        }
      } catch (error) {
        console.error("Error during token exchange:", error)
        setStatus('error')
        window.dispatchEvent(new CustomEvent('google-auth-failure'))
        setTimeout(() => {
          router.push('/auth-error')
        }, 3000)
      }
    }

    const params = new URLSearchParams(window.location.search)
    const authCode = params.get('code')

    if (authCode) {
      exchangeAuthCode(authCode)
    } else {
      console.error('No authorization code found in the URL')
      setStatus('error')
      window.dispatchEvent(new CustomEvent('google-auth-failure'))
      setTimeout(() => {
        router.push('/auth-error')
      }, 3000)
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl text-white font-semibold mb-4">
          {status === 'processing' && 'Processing authentication...'}
          {status === 'success' && 'Authentication successful!'}
          {status === 'error' && 'Authentication failed.'}
        </h1>
        <p className="text-muted-foreground text-gray-200">
          {status === 'processing' && 'Please wait while we complete your sign-in.'}
          {status === 'success' && 'Redirecting to dashboard...'}
          {status === 'error' && 'Redirecting to error page...'}
        </p>
      </div>
    </div>
  )
}


import { NextRequest, NextResponse } from 'next/server'
import { ServerAuthService } from '@/src/services/serverauthService'

export async function POST(request: NextRequest) {
  console.log('Received request to exchange auth code')

  try {
    const { code } = await request.json()

    if (!code) {
      console.error('No authorization code provided')
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 })
    }

    const { NEXT_PUBLIC_GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXT_PUBLIC_REDIRECT_URI } = process.env

    if (!NEXT_PUBLIC_GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !NEXT_PUBLIC_REDIRECT_URI) {
      console.error('Missing environment variables')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    console.log('Exchanging auth code for tokens')
    const tokenResponse = await fetchGoogleTokens(code, NEXT_PUBLIC_GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXT_PUBLIC_REDIRECT_URI)

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error('Token exchange failed:', errorData)
      return NextResponse.json({ error: errorData.error || 'Token exchange failed' }, { status: tokenResponse.status })
    }

    const data = await tokenResponse.json()
    console.log('Token exchange successful')

    await ServerAuthService.saveTokens(data.access_token, data.refresh_token, data.expires_in)
    
    console.log('Tokens saved successfully')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error exchanging tokens:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function fetchGoogleTokens(code: string, clientId: string, clientSecret: string, redirectUri: string) {
  return fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })
}


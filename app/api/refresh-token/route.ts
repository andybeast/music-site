import { NextRequest, NextResponse } from 'next/server';
import { ServerAuthService } from '@/src/services/serverauthService';

export async function POST(request: NextRequest) {
  try {
    const { refresh_token } = await request.json();

    if (!refresh_token) {
      return NextResponse.json({ error: 'Refresh token is required' }, { status: 400 });
    }

    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      console.error('Missing environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const tokenResponse = await fetchRefreshedTokens(refresh_token, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Token refresh failed:', errorData);
      return NextResponse.json({ error: errorData.error || 'Token refresh failed' }, { status: tokenResponse.status });
    }

    const data = await tokenResponse.json();

    // Save the new tokens
    await ServerAuthService.saveTokens(data.access_token, data.refresh_token || refresh_token, data.expires_in);

    // Return the new token data to the client
    return NextResponse.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token || refresh_token,
      expires_in: data.expires_in,
    });

  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function fetchRefreshedTokens(refreshToken: string, clientId: string, clientSecret: string) {
  return fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
}


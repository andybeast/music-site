import { NextRequest, NextResponse } from 'next/server';
import { ServerAuthService } from '@/src/services/serverauthService';
import { getUserInfo } from '@/src/lib/users';

export async function GET(request: NextRequest) {
  try {
    const accessToken = await ServerAuthService.getAccessToken();

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error('Google API response:', await response.text());
      throw new Error(`Failed to fetch user info: ${response.status} ${response.statusText}`);
    }

    const googleUserData = await response.json();

    // Fetch user info from MongoDB
    const userInfo = await getUserInfo(googleUserData.email);

    if (!userInfo) {
      throw new Error('User not found in database');
    }

    return NextResponse.json(userInfo);
  } catch (error) {
    console.error('Error fetching user info:', error);

    // Type guard for error instance
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Handle unknown error types
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

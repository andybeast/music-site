import { NextRequest, NextResponse } from 'next/server';
import { ServerAuthService } from '@/src/services/serverauthService';
import { getUserInfo } from '@/src/lib/users';

export async function GET() {
  console.log('Received request to /api/user-info');
  try {
    const accessToken = await ServerAuthService.getAccessToken();

    if (!accessToken) {
      console.log('No access token found');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    console.log('Fetching user info from Google');
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error('Google API response:', await response.text());
      throw new Error(`Failed to fetch user info from Google: ${response.status} ${response.statusText}`);
    }

    const googleUserData = await response.json();
    console.log('Received user data from Google:', googleUserData.email);

    console.log('Fetching user info from MongoDB');
    const userInfo = await getUserInfo(googleUserData.email);

    if (!userInfo) {
      console.log('User not found in database');
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    console.log('Successfully fetched user info');
    return NextResponse.json(userInfo);
  } catch (error: unknown) {
    console.error('Error in /api/user-info:', error);
    
    if (error instanceof Error) {
      return NextResponse.json({ error: 'An error occurred while fetching user info', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred while fetching user info' }, { status: 500 });
    }
  }
}


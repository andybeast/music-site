import { NextResponse } from 'next/server';
import { ServerAuthService } from '@/src/services/serverauthService';

export async function GET() {
  try {
    const accessToken = await ServerAuthService.getAccessToken();
    if (accessToken) {
      // You might want to verify the token here as well
      return NextResponse.json({ isAuthenticated: true });
    } else {
      return NextResponse.json({ isAuthenticated: false });
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    return NextResponse.json({ isAuthenticated: false, error: 'Failed to check authentication status' }, { status: 500 });
  }
}


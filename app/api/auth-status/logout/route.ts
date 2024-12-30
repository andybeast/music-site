import { NextResponse } from 'next/server';
import { ServerAuthService } from '@/src/services/serverauthService';

export async function POST() {
  try {
    await ServerAuthService.clearTokens();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ success: false, error: 'Failed to logout' }, { status: 500 });
  }
}


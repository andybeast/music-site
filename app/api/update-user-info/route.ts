import { NextRequest, NextResponse } from 'next/server';
import { ServerAuthService } from '@/src/services/serverauthService';
import { updateUserInfo } from '@/src/lib/users';

export async function POST(request: NextRequest) {
  try {
    const accessToken = await ServerAuthService.getAccessToken();

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userData = await request.json();

    if (!userData.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Update user info in MongoDB
    const updatedUser = await updateUserInfo(userData.email, userData);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user info:', error);
    return NextResponse.json({ error: 'An error occurred while updating user info' }, { status: 500 });
  }
}


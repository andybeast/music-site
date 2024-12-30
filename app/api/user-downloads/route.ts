import { NextResponse } from 'next/server';
import { getUserInfo } from '@/src/lib/users';
import { ServerAuthService } from '@/src/services/serverauthService';

const MAX_FREE_DOWNLOADS = 20;

export async function GET() {
  try {
    const accessToken = await ServerAuthService.getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const googleUserInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then(res => res.json());

    const userInfo = await getUserInfo(googleUserInfo.email);

    if (!userInfo) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const remainingDownloads = MAX_FREE_DOWNLOADS - (userInfo.downloadCount || 0);

    return NextResponse.json({ remainingDownloads });
  } catch (error) {
    console.error('Error fetching user downloads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


import { cookies } from 'next/headers';

export class ServerAuthService {
  static TOKEN_KEY = 'lunar_token_data';

  static async getTokens() {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(this.TOKEN_KEY)?.value;
    return this.parseTokenData(cookieValue);
  }

  static parseTokenData(cookieValue: string | undefined) {
    if (!cookieValue) return null;

    try {
      const tokenData = JSON.parse(cookieValue);
      if (!tokenData.access_token || !tokenData.expires_at) {
        console.error('Invalid token data structure');
        return null;
      }
      return tokenData;
    } catch (error) {
      console.error('Error parsing token data:', error);
      return null;
    }
  }

  static async saveTokens(accessToken: string, refreshToken: string, expiresIn: number) {
    const tokenData = {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: Date.now() + expiresIn * 1000,
    };

    const cookieStore = await cookies();
    cookieStore.set(this.TOKEN_KEY, JSON.stringify(tokenData), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  static async clearTokens() {
    const cookieStore = await cookies();
    cookieStore.set(this.TOKEN_KEY, '', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0), // Expire the cookie
    });

    
  }

  

  static async getAccessToken() {
    const tokens = await this.getTokens();
    return tokens?.access_token || null;
  }
  static async refreshAccessToken(refreshToken: string) {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    await this.saveTokens(data.access_token, refreshToken, data.expires_in);
    return data.access_token;
  }
  
}


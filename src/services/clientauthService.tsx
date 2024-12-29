'use client'

import Cookies from 'js-cookie';

export class ClientAuthService {
  static TOKEN_KEY = 'lunar_token_data';

  static isAuthenticated(): boolean {
    console.log('ClientAuthService: Checking authentication');
    const tokenData = this.getTokens();
    const isValid = !!tokenData && Date.now() < tokenData.expires_at;
    console.log('ClientAuthService: Is authenticated:', isValid);
    return isValid;
  }

  static getTokens() {
    console.log('ClientAuthService: Getting tokens');
    const cookieValue = Cookies.get(this.TOKEN_KEY);
    return this.parseTokenData(cookieValue);
  }

  private static parseTokenData(cookieValue: string | undefined) {
    if (!cookieValue) {
      console.log('ClientAuthService: No token cookie found');
      return null;
    }

    try {
      const tokenData = JSON.parse(cookieValue);
      if (!tokenData.access_token || !tokenData.expires_at) {
        console.error('ClientAuthService: Invalid token data structure');
        return null;
      }
      console.log('ClientAuthService: Token data parsed successfully');
      return tokenData;
    } catch (error) {
      console.error('ClientAuthService: Error parsing token data:', error);
      return null;
    }
  }

  static saveTokens(accessToken: string, refreshToken: string, expiresIn: number) {
    console.log('ClientAuthService: Saving tokens');
    const tokenData = {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: Date.now() + expiresIn * 1000,
    };

    Cookies.set(this.TOKEN_KEY, JSON.stringify(tokenData), {
      expires: 7,
      secure: true,
      sameSite: 'lax',
    });
    console.log('ClientAuthService: Tokens saved successfully');
  }

  static clearTokens() {
    console.log('ClientAuthService: Clearing tokens');
    Cookies.remove(this.TOKEN_KEY);
  }

  static async refreshTokenIfNeeded(): Promise<boolean> {
    console.log('ClientAuthService: Checking if token refresh is needed');
    const tokenData = this.getTokens();
    if (!tokenData) return false;

    const now = Date.now();
    const expiresAt = tokenData.expires_at;

    if (now >= expiresAt - 5 * 60 * 1000) {
      console.log('ClientAuthService: Token needs refreshing');
      try {
        const response = await fetch('/api/refresh-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: tokenData.refresh_token }),
        });

        if (!response.ok) {
          throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}`);
        }

        const newTokenData = await response.json();
        this.saveTokens(
          newTokenData.access_token,
          newTokenData.refresh_token,
          newTokenData.expires_in,
        );
        console.log('ClientAuthService: Token refreshed successfully');
        return true;
      } catch (error) {
        console.error('ClientAuthService: Error refreshing token:', error);
        this.clearTokens();
        return false;
      }
    }

    console.log('ClientAuthService: Token is still valid');
    return true;
  }
}


import { NextRequest, NextResponse } from 'next/server'
import { ServerAuthService } from '@/src/services/serverauthService'
import { saveUserInfo } from '@/src/lib/users'

export async function POST(request: NextRequest) {
  try {
    const accessToken = await ServerAuthService.getAccessToken()

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const userData = await request.json()

    // Save user info to MongoDB
    const updatedUser = await saveUserInfo(userData)

    // Ensure the updatedUser is serializable
    const serializableUser = JSON.parse(JSON.stringify(updatedUser))

    return NextResponse.json(serializableUser)
  } catch (error) {
    console.error('Error updating user info:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


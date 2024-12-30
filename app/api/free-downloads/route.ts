import { NextResponse } from 'next/server';
import { ServerAuthService } from '@/src/services/serverauthService';
import { Storage } from '@google-cloud/storage';
import archiver from 'archiver';
import { Readable } from 'stream';
import { getUserInfo, updateUserDownloads } from '@/src/lib/users';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS || '{}'),
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME || '');
const MUSIC_FOLDER = 'freesongs/';
const MAX_FREE_DOWNLOADS = 20;

export async function POST(request: Request) {
  try {
    const accessToken = await ServerAuthService.getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 });
    }

    const { albumId, songTitles } = await request.json();

    if (!albumId || !songTitles || songTitles.length === 0) {
      return NextResponse.json({ error: 'Invalid request', code: 'INVALID_REQUEST' }, { status: 400 });
    }

    // Fetch user info
    const googleUserInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then(res => res.json());

    const userInfo = await getUserInfo(googleUserInfo.email);

    if (!userInfo) {
      return NextResponse.json({ error: 'User not found', code: 'USER_NOT_FOUND' }, { status: 404 });
    }

    // Check if user has enough free downloads
    const remainingDownloads = MAX_FREE_DOWNLOADS - (userInfo.downloadCount || 0);
    if (remainingDownloads < songTitles.length) {
      return NextResponse.json({ 
        error: 'Not enough free downloads remaining', 
        code: 'DOWNLOAD_LIMIT_REACHED',
        remainingDownloads
      }, { status: 403 });
    }

    // Create a zip file
    const archive = archiver('zip', { zlib: { level: 9 } });
    const readableStream = new Readable({ read() {} });

    archive.on('data', (chunk) => readableStream.push(chunk));
    archive.on('end', () => readableStream.push(null));
    archive.on('error', (err) => {
      console.error('Archiver error:', err);
      readableStream.emit('error', err);
    });

    let filesAdded = 0;

    // Add files to the zip
    for (const songTitle of songTitles) {
      const filePath = `${MUSIC_FOLDER}${songTitle}.wav`;
      const file = bucket.file(filePath);
      const [exists] = await file.exists();
      if (exists) {
        const fileStream = file.createReadStream();
        archive.append(fileStream, { name: `${songTitle}.wav` });
        filesAdded++;
      } else {
        console.warn(`File not found: ${filePath}`);
      }
    }

    if (filesAdded === 0) {
      return NextResponse.json({ error: 'No files found to add to the archive', code: 'NO_FILES_FOUND' }, { status: 404 });
    }

    // Finalize the archive
    await new Promise<void>((resolve, reject) => {
      archive.on('error', reject);
      archive.on('end', resolve);
      archive.finalize();
    });

    // Update user's download count in MongoDB
    const updatedUser = await updateUserDownloads(userInfo.email, filesAdded);

    if (!updatedUser) {
      console.error(`Failed to update download count for user: ${userInfo.email}`);
      // You might want to decide how to handle this case. For now, we'll continue with the download.
    }

    // Create the response with the readable stream
    const response = new NextResponse(readableStream as unknown as BodyInit);
    response.headers.set('Content-Type', 'application/zip');
    response.headers.set('Content-Disposition', `attachment; filename="${albumId}.zip"`);

    return response;
  } catch (error) {
    console.error('Error creating zip file:', error);
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 });
  }
}


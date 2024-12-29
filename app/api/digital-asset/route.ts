import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

// Initialize Google Cloud Storage client
let storage: Storage;
try {
  const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS || '{}');
  if (!credentials.client_email) {
    throw new Error('Missing client_email in Google Cloud credentials');
  }
  storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    credentials: credentials,
  });
} catch (error) {
  console.error('Error initializing Google Cloud Storage:', error);
  // We'll handle this in the request handler
}

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME || 'your-bucket-name';

// Map of product names to zip file names
const productZipMap: { [key: string]: string } = {
  'TropicNights': 'Tropic_Nights.zip',
  'LofiReggae': 'Lofi_Reggae.zip',
  // Add more mappings as needed
};

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}

async function handleRequest(request: NextRequest) {
  if (!storage) {
    return NextResponse.json({ error: 'Google Cloud Storage is not properly initialized' }, { status: 500 });
  }

  let customId: string | null;

  if (request.method === 'GET') {
    const { searchParams } = new URL(request.url);
    customId = searchParams.get('customId');
  } else {
    const body = await request.json();
    customId = body.customId;
  }

  console.log('Received customId:', customId);

  if (!customId || customId === 'unknown') {
    return NextResponse.json({ error: 'Valid Custom ID is required' }, { status: 400 });
  }

  try {
    const signedUrls = await generateSignedUrlsForZips(customId); 
    
    // Set the cookie expiration time to match the signed URL expiration (15 minutes)
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000);
    
    // Store the signed URLs in a cookie with expiration
    const response = NextResponse.json({ downloadUrls: signedUrls });
    const cookieValue = JSON.stringify(signedUrls);
    response.headers.set('Set-Cookie', `downloadUrls=${encodeURIComponent(cookieValue)}; Path=/; SameSite=Strict; Expires=${expirationTime.toUTCString()}`);
    
    // Set customId cookie
    response.headers.append('Set-Cookie', `customId=${customId}; Path=/; SameSite=Strict; Expires=${expirationTime.toUTCString()}`);
    
    // Log the cookies being set
    console.log('Setting downloadUrls cookie:', cookieValue);
    console.log('Setting customId cookie:', customId);

    return response;
  } catch (error) {
    console.error('Error generating signed URLs:', error);
    if (error instanceof Error) {
      return NextResponse.json({ 
        error: 'Failed to generate download URL', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred while generating download URLs' }, { status: 500 });
  }
}

async function generateSignedUrlsForZips(customId: string): Promise<string[]> { 
  console.log('Generating signed URLs for customId:', customId);

  const parts = customId.split('-');
  const productNames = parts.slice(0, -1);

  console.log('Extracted product names:', productNames);

  if (productNames.length === 0) {
    throw new Error('No valid product names found in the custom ID');
  }

  const signedUrls: string[] = [];

  for (const productName of productNames) {
    const fileName = productZipMap[productName];
    if (!fileName) {
      console.warn(`No zip file found for product: ${productName}`);
      continue;
    }

    const options = {
      version: 'v4' as const,
      action: 'read' as const,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      responseDisposition: `attachment; filename="${encodeURIComponent(fileName)}"`,
      
    };

    try {
      const [signedUrl] = await storage
        .bucket(bucketName)
        .file(fileName)
        .getSignedUrl(options);

      signedUrls.push(signedUrl);
    } catch (error) {
      console.error(`Error generating signed URL for ${fileName}:`, error);
    }
  }

  if (signedUrls.length === 0) {
    throw new Error('Failed to generate any valid download URLs');
  }
  console.log('Generated signed URLs:', signedUrls);
  return signedUrls;
}


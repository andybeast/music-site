import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const downloadUrls = cookieStore.get('downloadUrls')
  const customId = cookieStore.get('customId')

  console.log('Cookies received:', { downloadUrls, customId });

  if (!downloadUrls) {
    console.error('downloadUrls cookie is missing');
    return NextResponse.json({ error: 'Download URLs not found' }, { status: 404 });
  }

  if (!customId) {
    console.warn('customId cookie is missing');
  }

  try {
    // Parse the JSON string
    const parsedUrls = JSON.parse(downloadUrls.value);
    
    // Decode the URLs
    const decodedUrls = parsedUrls.map((url: string) => decodeURIComponent(url));
    
    console.log('Decoded URLs:', decodedUrls);

    return NextResponse.json({ 
      downloadUrls: decodedUrls, 
      customId: customId ? customId.value : null 
    });
  } catch (error) {
    console.error('Error parsing download URLs:', error);
    console.error('Raw cookie value:', downloadUrls.value);
    return NextResponse.json({ 
      error: 'Invalid download URL format',
      details: error instanceof Error ? error.message : 'Unknown error',
      rawValue: downloadUrls.value
    }, { status: 500 });
  }
}


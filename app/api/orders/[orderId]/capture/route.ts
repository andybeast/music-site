import { NextResponse } from 'next/server';
import { ordersController } from '@/src/lib/paypal-client';
import { ApiError } from "@paypal/paypal-server-sdk";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    console.log('Capturing order for digital goods (zip file):', orderId);

    const captureResponse = await ordersController.ordersCapture({
      id: orderId
    });

    let parsedBody;
    if (typeof captureResponse.body === 'string') {
      parsedBody = JSON.parse(captureResponse.body);
    } else if (captureResponse.body instanceof ReadableStream) {
      const reader = captureResponse.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
      }
      parsedBody = JSON.parse(result);
    } else if (captureResponse.body instanceof Blob) {
      const text = await captureResponse.body.text();
      parsedBody = JSON.parse(text);
    } else {
      console.error('Unexpected body type:', typeof captureResponse.body);
      throw new Error('Unexpected body type');
    }

    console.log('Parsed capture response:', JSON.stringify(parsedBody, null, 2));

    if (parsedBody.status === 'COMPLETED') {
      // Payment is successful, get the download URL for the zip file
      const customId = parsedBody.purchase_units?.[0]?.payments?.captures?.[0]?.custom_id;
      console.log('Extracted customId:', customId);

      if (!customId) {
        console.error('Custom ID not found in the captured order. Full response:', JSON.stringify(parsedBody, null, 2));
        console.error('Attempted to extract custom_id from:', JSON.stringify(parsedBody.purchase_units?.[0]?.payments?.captures?.[0], null, 2));
        throw new Error('Custom ID not found in the captured order');
      }

      // Call the Digital Asset API to generate and set the downloadUrls cookie
      const digitalAssetResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/digital-asset?customId=${encodeURIComponent(customId)}`);
      
      if (!digitalAssetResponse.ok) {
        const errorText = await digitalAssetResponse.text();
        console.error('Failed to generate download URL. Response:', errorText);
        throw new Error('Failed to generate download URL for zip file');
      }

      // Create a response with the success data
      const response = NextResponse.json({
        status: 'success',
        message: 'Payment completed successfully',
        customId: customId
      }, { status: 200 });

      // Set cookie for customId
      const expirationTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
      response.headers.append('Set-Cookie', `customId=${customId}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${expirationTime.toUTCString()}`);

      return response;
    } else {
      return NextResponse.json({
        status: 'failed',
        message: 'Payment was not completed successfully'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error capturing order:', error);
    if (error instanceof ApiError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to capture order.' }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import { ordersController } from '@/src/lib/paypal-client';
import { ApiError, OrderRequest, CheckoutPaymentIntent } from "@paypal/paypal-server-sdk";

export async function POST(request: Request) {
  try {
    const { cart } = await request.json();

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty cart' }, { status: 400 });
    }

    const totalAmount = cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      if (isNaN(itemPrice)) {
        throw new Error(`Invalid price for item: ${item.name}`);
      }
      return total + itemPrice;
    }, 0);

    // Create a custom ID based on product names
    const customId = createCustomId(cart);

    const orderRequest: OrderRequest = {
      intent: "CAPTURE" as CheckoutPaymentIntent,
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: totalAmount.toFixed(2),
            breakdown: {
              itemTotal: {
                currencyCode: "USD",
                value: totalAmount.toFixed(2)
              }
            }
          },
          items: cart.map(item => ({
            name: item.name,
            unitAmount: {
              currencyCode: "USD",
              value: parseFloat(item.price).toFixed(2),
            },
            quantity: "1",
          })),
          customId: customId,
        },
      ],
    };

    console.log('Creating PayPal order with request:', JSON.stringify(orderRequest, null, 2));

    const collect = {
      body: orderRequest,
    };

    const { body, ...httpResponse } = await ordersController.ordersCreate(collect);

    let parsedBody;
    try {
      if (typeof body === 'string') {
        parsedBody = JSON.parse(body);
      } else if (body instanceof ReadableStream) {
        const reader = body.getReader();
        const decoder = new TextDecoder();
        let result = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value);
        }
        parsedBody = JSON.parse(result);
      } else if (body instanceof Blob) {
        const text = await body.text();
        parsedBody = JSON.parse(text);
      } else {
        throw new Error('Unexpected body type');
      }
    } catch (parseError) {
      console.error('Error parsing response body:', parseError);
      return NextResponse.json({ error: 'Failed to parse PayPal response' }, { status: 500 });
    }

    if (!parsedBody) {
      return NextResponse.json({ error: 'Empty response from PayPal' }, { status: 500 });
    }

    console.log('PayPal order created successfully:', JSON.stringify(parsedBody, null, 2));

    return NextResponse.json(parsedBody, { status: httpResponse.statusCode });
  } catch (error) {
    console.error('Detailed error:', error);
    if (error instanceof ApiError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON in request' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create order.' }, { status: 500 });
  }
}

function createCustomId(cart: Array<{ name: string }>): string {
  // Extract product names and join them
  const productNames = cart.map(item => item.name.replace(/[^a-zA-Z0-9]/g, ''));
  
  // Create a string of product names
  let customId = productNames.join('-');
  
  // Limit the length to 117 characters (to leave room for the timestamp)
  customId = customId.slice(0, 117);
  
  // Add a timestamp to ensure uniqueness
  const timestamp = Date.now().toString(36);
  
  // Combine the product names and timestamp, ensuring it doesn't exceed 127 characters
  return `${customId}-${timestamp}`.slice(0, 127);
}



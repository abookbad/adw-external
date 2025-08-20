import { NextRequest, NextResponse } from 'next/server';

const VAPI_CONFIG = {
  VAPI_PHONE_NUMBER_ID: "8f8082ed-1755-4963-b6c9-4d31c8f185a1",
  BEARER_TOKEN: process.env.VAPI_API_KEY,
  API_URL: "https://api.vapi.ai/call"
};

export async function POST(request: NextRequest) {
  try {
    const { workflowId, phoneNumber, name, businessName, email, industry, scenarioTitle } = await request.json();

    // Validate required fields
    if (!workflowId || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields: workflowId and phoneNumber' },
        { status: 400 }
      );
    }

    // Validate phone number format (+1XXXXXXXXXX)
    const phoneRegex = /^\+1\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Must be +1XXXXXXXXXX' },
        { status: 400 }
      );
    }

    // Minimal validation for name (non-empty string)
    const errors: string[] = [];
    if (!name || typeof name !== 'string' || !name.trim()) errors.push('name');
    if (!businessName || typeof businessName !== 'string' || !businessName.trim()) errors.push('businessName');
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email');

    if (errors.length) {
      // Keep behavior minimal: only enforce name presence, log others
      if (errors.includes('name')) {
        return NextResponse.json(
          { error: 'Missing required field: name' },
          { status: 400 }
        );
      }
      console.warn('Invalid or missing optional fields:', errors.filter((e) => e !== 'name'));
    }

    // Prepare VAPI payload with first_name for workflow variable usage
    const payload = {
      workflowId: workflowId,
      customer: { number: phoneNumber, first_name: name },
      phoneNumberId: VAPI_CONFIG.VAPI_PHONE_NUMBER_ID,
      assistantOverrides: {
        variableValues: {
          first_name: name,
        },
      },
    } as const;

    // Log the additional info for internal tracking/analytics
    console.log('Voice call request info:', {
      name,
      businessName,
      email,
      industry,
    });

    // Make call to VAPI
    const response = await fetch(VAPI_CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_CONFIG.BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('VAPI API Error:', responseData);
      return NextResponse.json(
        { error: 'Failed to initiate call. Please try again.' },
        { status: response.status }
      );
    }

    // Fire-and-forget: send lead details to GHL webhook (does not block response)
    try {
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/PqpLnJVC3VrmBmWnu5d2/webhook-trigger/f39d484c-de03-41d3-8212-44004b94043f';
      const digitsOnlyPhone = phoneNumber.replace(/\D/g, '');
      const payloadForWebhook = {
        source: 'adw-external-app',
        event: 'ai_voice_demo_started',
        name,
        businessName,
        email,
        phoneE164: phoneNumber,
        phoneDigits: digitsOnlyPhone,
        industry,
        scenario: scenarioTitle,
        workflowId,
        callId: responseData?.id ?? null,
        timestamp: new Date().toISOString()
      };
      // Do not await strictly; but ensure request is fired reliably
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadForWebhook)
      }).catch((err) => {
        console.warn('GHL webhook error:', err);
      });
    } catch (err) {
      console.warn('Failed to trigger GHL webhook:', err);
    }

    // Return success response
    return NextResponse.json({
      success: true,
      callId: responseData.id,
      message: 'Call initiated successfully'
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
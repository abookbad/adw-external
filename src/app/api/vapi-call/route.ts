import { NextRequest, NextResponse } from 'next/server';

const VAPI_CONFIG = {
  VAPI_PHONE_NUMBER_ID: "06ac9b34-5304-4c9c-80ff-9bb06a029f39",
  BEARER_TOKEN: process.env.VAPI_API_KEY,
  API_URL: "https://api.vapi.ai/call"
};

export async function POST(request: NextRequest) {
  try {
    const { workflowId, phoneNumber } = await request.json();

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

    // Prepare VAPI payload
    const payload = {
      workflowId: workflowId,
      customer: { number: phoneNumber },
      phoneNumberId: VAPI_CONFIG.VAPI_PHONE_NUMBER_ID
    };

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
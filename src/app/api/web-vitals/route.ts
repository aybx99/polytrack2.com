import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const metric = await request.json();

    // Validate metric structure
    if (!metric.name || typeof metric.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      );
    }

    // Log web vitals (in production, send to analytics service)
    console.log('Web Vitals:', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      timestamp: new Date().toISOString(),
      url: request.headers.get('referer'),
      userAgent: request.headers.get('user-agent'),
    });

    // In production, you might want to:
    // 1. Send to Google Analytics 4
    // 2. Send to DataDog, New Relic, or other monitoring service
    // 3. Store in database for analysis
    // 4. Send to custom analytics endpoint

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing web vitals:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

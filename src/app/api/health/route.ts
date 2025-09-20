import { NextResponse } from 'next/server';

export async function GET() {
  const startTime = Date.now();

  try {
    // Basic health checks
    const checks = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version,
    };

    // Test WordPress GraphQL connection
    let wpStatus = 'unknown';
    try {
      const wpResponse = await fetch(process.env.WP_GRAPHQL_URL || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: '{ __typename }',
        }),
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      wpStatus = wpResponse.ok ? 'healthy' : 'unhealthy';
    } catch {
      wpStatus = 'unreachable';
    }

    const responseTime = Date.now() - startTime;
    const isHealthy = wpStatus === 'healthy' && responseTime < 1000;

    return NextResponse.json(
      {
        status: isHealthy ? 'healthy' : 'degraded',
        checks: {
          ...checks,
          wordpress: wpStatus,
          responseTime: `${responseTime}ms`,
        },
      },
      {
        status: isHealthy ? 200 : 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  }
}

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health checks
    const checks = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      services: {
        api: 'operational',
        database: 'operational', // In real implementation, check DB connection
        email: 'operational',    // In real implementation, check email service
        web: 'operational'
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.env.npm_package_version || '1.0.0'
    };

    return NextResponse.json(checks, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || token !== process.env.REVALIDATION_SECRET) {
      console.warn('Unauthorized revalidation attempt');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, path, tags } = body;

    // Log the revalidation request
    console.log(`Revalidation request: ${type}`);

    switch (type) {
      case 'path':
        if (!path) {
          return NextResponse.json(
            { message: 'Path is required for path revalidation' },
            { status: 400 }
          );
        }
        await revalidatePath(path);
        console.log(`Path revalidated: ${path}`);
        break;

      case 'tag':
        if (!tags || !Array.isArray(tags)) {
          return NextResponse.json(
            { message: 'Tags array is required for tag revalidation' },
            { status: 400 }
          );
        }
        for (const tag of tags) {
          await revalidateTag(tag);
        }
        console.log(`Tags revalidated: ${tags.join(', ')}`);
        break;

      case 'all':
        // Revalidate common paths
        await revalidatePath('/');
        await revalidatePath('/sitemap.xml');
        // You can add more critical paths here
        console.log('All critical paths revalidated');
        break;

      default:
        return NextResponse.json(
          { message: 'Invalid revalidation type. Use "path", "tag", or "all"' },
          { status: 400 }
        );
    }

    return NextResponse.json(
      {
        message: 'Revalidation successful',
        timestamp: new Date().toISOString(),
        type,
        ...(path && { path }),
        ...(tags && { tags }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Revalidation error', error as Error);

    return NextResponse.json(
      {
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST for revalidation.' },
    { status: 405 }
  );
}

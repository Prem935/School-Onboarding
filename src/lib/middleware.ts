import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from './auth';

// Middleware to protect API routes
export function withAuth(handler: (request: NextRequest, user: { email: string }) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authHeader = request.headers.get('authorization');
    const user = requireAuth(authHeader);

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    return handler(request, user);
  };
}

// Middleware to check authentication status
export function checkAuth(request: NextRequest): { email: string } | null {
  const authHeader = request.headers.get('authorization');
  return requireAuth(authHeader);
}

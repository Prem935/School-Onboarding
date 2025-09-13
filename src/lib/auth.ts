import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '24h'; // Token expires in 24 hours

export interface JWTPayload {
  email: string;
  iat?: number;
  exp?: number;
}

// Generate JWT token
export function generateToken(email: string): string {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

// Extract token from Authorization header
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) {
    return null;
  }
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
}

// Middleware to verify authentication
export function requireAuth(authHeader: string | null): { email: string } | null {
  const token = extractTokenFromHeader(authHeader);
  
  if (!token) {
    return null;
  }
  
  const payload = verifyToken(token);
  
  if (!payload || !payload.email) {
    return null;
  }
  
  return { email: payload.email };
}

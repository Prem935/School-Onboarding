// In-memory OTP storage with expiry mechanism
interface OTPData {
  code: string;
  email: string;
  expiresAt: number;
}

// Store OTPs in memory (in production, consider using Redis)
const otpStore = new Map<string, OTPData>();

// Clean up expired OTPs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [email, otpData] of otpStore.entries()) {
    if (otpData.expiresAt < now) {
      otpStore.delete(email);
    }
  }
}, 5 * 60 * 1000);

// Generate a 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP with 10-minute expiry
export function storeOTP(email: string, code: string): void {
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  otpStore.set(email, {
    code,
    email,
    expiresAt
  });
}

// Verify OTP
export function verifyOTP(email: string, code: string): boolean {
  const otpData = otpStore.get(email);
  
  if (!otpData) {
    return false;
  }
  
  // Check if OTP has expired
  if (otpData.expiresAt < Date.now()) {
    otpStore.delete(email);
    return false;
  }
  
  // Check if code matches
  if (otpData.code !== code) {
    return false;
  }
  
  // Remove OTP after successful verification
  otpStore.delete(email);
  return true;
}

// Remove OTP (for cleanup)
export function removeOTP(email: string): void {
  otpStore.delete(email);
}

// Get OTP expiry time (for debugging)
export function getOTPExpiry(email: string): number | null {
  const otpData = otpStore.get(email);
  return otpData ? otpData.expiresAt : null;
}

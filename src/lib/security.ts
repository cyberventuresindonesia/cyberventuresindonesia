/**
 * Security utilities for production
 */

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Password validation
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) errors.push('Password minimal 8 karakter');
  if (!/[A-Z]/.test(password)) errors.push('Password harus ada huruf besar');
  if (!/[a-z]/.test(password)) errors.push('Password harus ada huruf kecil');
  if (!/[0-9]/.test(password)) errors.push('Password harus ada angka');
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('Password harus ada karakter spesial');
  
  return { valid: errors.length === 0, errors };
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate secure random token
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Hash IP untuk logging (privacy)
export function hashIP(ip: string): string {
  // Simple hash untuk logging tanpa menyimpan IP asli
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `anon-${Math.abs(hash).toString(16)}`;
}

// Check if request is from localhost
export function isLocalhost(ip: string): boolean {
  return ip === '127.0.0.1' || ip === 'localhost' || ip === '::1';
}

// Feature flag checks
export const FeatureFlags = {
  isChallengesEnabled(): boolean {
    return process.env.ENABLE_CHALLENGES === 'true';
  },
  
  isRegistrationEnabled(): boolean {
    return process.env.ENABLE_REGISTRATION !== 'false';
  },
  
  isQuizEnabled(): boolean {
    return process.env.ENABLE_QUIZ !== 'false';
  },
  
  isLiveDefenseEnabled(): boolean {
    return process.env.ENABLE_LIVE_DEFENSE !== 'false';
  },
};

/**
 * Environment variable validation utility
 * Ensures all required environment variables are present
 */

export function validateEnv() {
  const requiredEnvVars = ['MONGO_URL'];

  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

// Validate on import (only in production or when explicitly needed)
if (process.env.NODE_ENV === 'production') {
  validateEnv();
}


/**
 * Error handling utilities for the application
 */

import { AuthError } from '@/types/auth';

// Define custom error classes
export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string, code?: string) {
    super(message, 401, code);
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, code?: string) {
    super(message, 400, code);
    this.name = 'ValidationError';
  }
}

/**
 * Format error to a standard structure
 */
export function formatError(error: unknown): AuthError {
  if (error instanceof ApiError) {
    return {
      message: error.message,
      status: error.status,
      code: error.code
    };
  }
  
  if (error instanceof Error) {
    return {
      message: error.message
    };
  }
  
  return {
    message: String(error)
  };
}

/**
 * Handle API errors in a consistent way
 */
export function handleApiError(error: unknown): never {
  console.error('API Error:', error);
  
  if (error instanceof ApiError) {
    throw error;
  }
  
  if (error instanceof Error) {
    throw new ApiError(error.message);
  }
  
  throw new ApiError('An unexpected error occurred');
}

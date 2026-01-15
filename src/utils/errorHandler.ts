/**
 * Error Handler Utility
 * 
 * Provides consistent error handling patterns throughout the application.
 * Includes:
 * - Standardized error processing
 * - User-friendly error messages
 * - Integration with toast notifications
 * - Logging for debugging
 * 
 * Usage:
 *   import { handleError, createErrorMessage } from "@/utils/errorHandler";
 *   
 *   try {
 *     await someAsyncOperation();
 *   } catch (error) {
 *     handleError(error, "Failed to save data");
 *   }
 */

import { logger } from "./logger";

/**
 * Common error types in the application
 */
export type ErrorType = 
  | "network"      // Network/fetch failures
  | "auth"         // Authentication errors
  | "validation"   // Form/data validation errors
  | "database"     // Database operation errors
  | "api"          // External API errors
  | "unknown";     // Unclassified errors

/**
 * Structured error information
 */
export interface ErrorInfo {
  type: ErrorType;
  message: string;
  userMessage: string;
  originalError?: unknown;
  context?: Record<string, unknown>;
}

/**
 * Maps common error patterns to error types
 */
const classifyError = (error: unknown): ErrorType => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    // Network errors
    if (message.includes("network") || message.includes("fetch") || message.includes("connection")) {
      return "network";
    }
    
    // Auth errors
    if (message.includes("auth") || message.includes("unauthorized") || message.includes("forbidden")) {
      return "auth";
    }
    
    // Database errors (Supabase patterns)
    if (message.includes("pgrst") || message.includes("row-level security")) {
      return "database";
    }
    
    // Validation errors
    if (message.includes("validation") || message.includes("invalid")) {
      return "validation";
    }
  }
  
  return "unknown";
};

/**
 * Creates a user-friendly message based on error type
 */
const getUserMessage = (type: ErrorType, fallback: string): string => {
  const messages: Record<ErrorType, string> = {
    network: "Unable to connect. Please check your internet connection and try again.",
    auth: "Your session has expired. Please refresh the page and try again.",
    validation: "Please check your input and try again.",
    database: "Unable to save or retrieve data. Please try again later.",
    api: "An external service is temporarily unavailable. Please try again later.",
    unknown: fallback || "Something went wrong. Please try again.",
  };
  
  return messages[type];
};

/**
 * Extracts error message from various error formats
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === "string") {
    return error;
  }
  
  if (error && typeof error === "object") {
    // Handle Supabase error format
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
    
    // Handle error with code
    if ("code" in error && typeof error.code === "string") {
      return `Error code: ${error.code}`;
    }
  }
  
  return "An unexpected error occurred";
};

/**
 * Creates structured error information
 */
export const createErrorInfo = (
  error: unknown,
  userMessage?: string,
  context?: Record<string, unknown>
): ErrorInfo => {
  const type = classifyError(error);
  const message = getErrorMessage(error);
  
  return {
    type,
    message,
    userMessage: userMessage || getUserMessage(type, message),
    originalError: error,
    context,
  };
};

/**
 * Main error handler function
 * 
 * Processes an error, logs it, and optionally shows a toast notification.
 * 
 * @param error - The error to handle
 * @param userMessage - Optional custom message for the user
 * @param options - Additional options for handling
 * @returns ErrorInfo object with processed error details
 */
export const handleError = (
  error: unknown,
  userMessage?: string,
  options: {
    showToast?: boolean;
    context?: Record<string, unknown>;
    silent?: boolean;
  } = {}
): ErrorInfo => {
  const { showToast = true, context, silent = false } = options;
  
  // Create structured error info
  const errorInfo = createErrorInfo(error, userMessage, context);
  
  // Log the error (unless silent mode)
  if (!silent) {
    logger.error(errorInfo.message, error, {
      type: errorInfo.type,
      userMessage: errorInfo.userMessage,
      ...context,
    });
  }
  
  // Show toast notification if requested
  // Note: We don't import toast here to avoid circular dependencies
  // The caller should handle toast display if needed
  if (showToast && !silent) {
    // Return error info so caller can display toast
    // Example usage in component:
    // const errorInfo = handleError(error);
    // toast({ title: "Error", description: errorInfo.userMessage, variant: "destructive" });
  }
  
  return errorInfo;
};

/**
 * Wraps an async function with error handling
 * 
 * Usage:
 *   const safeFetch = withErrorHandler(async () => {
 *     return await fetchData();
 *   }, "Failed to fetch data");
 */
export const withErrorHandler = <T>(
  fn: () => Promise<T>,
  errorMessage: string
): (() => Promise<T | null>) => {
  return async () => {
    try {
      return await fn();
    } catch (error) {
      handleError(error, errorMessage);
      return null;
    }
  };
};

/**
 * Creates a typed error for throwing
 */
export class AppError extends Error {
  type: ErrorType;
  context?: Record<string, unknown>;
  
  constructor(
    message: string,
    type: ErrorType = "unknown",
    context?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
    this.type = type;
    this.context = context;
  }
}

/**
 * Throws an error if a condition is false (assertion helper)
 */
export const assert = (
  condition: boolean,
  message: string,
  type: ErrorType = "validation"
): asserts condition => {
  if (!condition) {
    throw new AppError(message, type);
  }
};

export default handleError;

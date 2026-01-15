/**
 * Logger Utility
 * 
 * Provides consistent logging throughout the application with:
 * - Environment-aware logging (disabled in production for performance)
 * - Structured log levels (debug, info, warn, error)
 * - Context tagging for easier debugging
 * 
 * Usage:
 *   import { logger } from "@/utils/logger";
 *   logger.info("User action", { userId: "123", action: "login" });
 *   logger.error("Failed to fetch", error, { endpoint: "/api/data" });
 */

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV;

// Log levels for filtering
type LogLevel = "debug" | "info" | "warn" | "error";

// Configuration for minimum log level
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Minimum level to display (can be configured via environment)
const MIN_LOG_LEVEL: LogLevel = isDevelopment ? "debug" : "warn";

/**
 * Checks if a log level should be displayed based on current configuration
 */
const shouldLog = (level: LogLevel): boolean => {
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[MIN_LOG_LEVEL];
};

/**
 * Formats a timestamp for log entries
 */
const getTimestamp = (): string => {
  return new Date().toISOString();
};

/**
 * Formats log context as a string for console output
 */
const formatContext = (context?: Record<string, unknown>): string => {
  if (!context || Object.keys(context).length === 0) return "";
  return ` | ${JSON.stringify(context)}`;
};

/**
 * Logger object with methods for each log level
 */
export const logger = {
  /**
   * Debug level - for detailed development information
   * Only shown in development mode
   */
  debug: (message: string, context?: Record<string, unknown>): void => {
    if (!shouldLog("debug")) return;
    console.debug(
      `[${getTimestamp()}] [DEBUG] ${message}${formatContext(context)}`
    );
  },

  /**
   * Info level - for general information about application flow
   */
  info: (message: string, context?: Record<string, unknown>): void => {
    if (!shouldLog("info")) return;
    console.info(
      `[${getTimestamp()}] [INFO] ${message}${formatContext(context)}`
    );
  },

  /**
   * Warn level - for potentially problematic situations
   */
  warn: (message: string, context?: Record<string, unknown>): void => {
    if (!shouldLog("warn")) return;
    console.warn(
      `[${getTimestamp()}] [WARN] ${message}${formatContext(context)}`
    );
  },

  /**
   * Error level - for error conditions
   * Includes optional error object for stack trace
   */
  error: (
    message: string,
    error?: unknown,
    context?: Record<string, unknown>
  ): void => {
    if (!shouldLog("error")) return;
    
    const errorDetails = error instanceof Error 
      ? { errorName: error.name, errorMessage: error.message }
      : error 
        ? { error: String(error) }
        : {};
    
    console.error(
      `[${getTimestamp()}] [ERROR] ${message}`,
      { ...errorDetails, ...context }
    );
    
    // In development, also log the full error stack
    if (isDevelopment && error instanceof Error && error.stack) {
      console.error(error.stack);
    }
  },

  /**
   * Group related logs together for better readability
   */
  group: (label: string): void => {
    if (!isDevelopment) return;
    console.group(label);
  },

  /**
   * End a log group
   */
  groupEnd: (): void => {
    if (!isDevelopment) return;
    console.groupEnd();
  },

  /**
   * Log a table of data (useful for arrays/objects)
   */
  table: (data: unknown[], columns?: string[]): void => {
    if (!isDevelopment) return;
    console.table(data, columns);
  },

  /**
   * Time a block of code execution
   * Returns a function to call when done
   */
  time: (label: string): (() => void) => {
    if (!isDevelopment) return () => {};
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      console.debug(`[TIMER] ${label}: ${duration.toFixed(2)}ms`);
    };
  },
};

export default logger;

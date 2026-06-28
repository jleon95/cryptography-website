import arkenv, { type } from "arkenv";

/**
 * Environment variable schema for server-side or runtime-only validation.
 */
export const Env = type({
	DATABASE_URL: "string",
	FRONTEND_ADDRESS: "string",
	MAX_HINTS: "number > 0",
	NODE_ENV: "'development' | 'production'",
	PINO_LOG_LEVEL: "'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'",
	SESSION_DELETION_CRON_SCHEDULE: "string",
	SESSION_DURATION: "number > 0",
});

export const env = arkenv(Env);
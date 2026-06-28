declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      FRONTEND_URL: string;
      MAX_HINTS: string;
      PINO_LOG_LEVEL: string;
      SESSION_DELETION_CRON_SCHEDULE: string;
      SESSION_DURATION: string;
    }
  }
}

// It is necessary to include this so that the file is treated as a module
export {};
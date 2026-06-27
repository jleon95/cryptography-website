declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PINO_LOG_LEVEL: string;
      SESSION_DURATION: string;
      MAX_HINTS: string;
      FRONTEND_ADDRESS: string;
      DATABASE_URL: string;
      SESSION_DELETION_CRON_SCHEDULE: string;
    }
  }
}

// It is necessary to include this so that the file is treated as a module
export {};
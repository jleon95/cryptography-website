# CryptographyWeb backend
This contains the code for the backend part of the app.

## Environment variables
- `PINO_LOG_LEVEL`: log level for the logger.
- `SESSION_DURATION`: session duration in milliseconds, after which the backend will ignore requests from a client until a new session is created. Expired sessions will be periodically deleted from the DB.
- `SESSION_DELETION_CRON_SCHEDULE`: cron-style schedule for the deletion of expired sessions.
- `MAX_HINTS`: number of successful hint requests allowed server-side for a given session.
- `FRONTEND_ADDRESS`: where the frontend is (for CORS reasons).
- `DATABASE_URL`: where the database is listening. Syntax: `postgresql://dbUser:dbPassword@postgres:5432/dbName`.

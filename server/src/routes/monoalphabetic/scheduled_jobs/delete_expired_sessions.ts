import prisma from '../../../prisma/prisma-client.js';
import logger from '../../../../logger.js';
import schedule from 'node-schedule';

async function scheduleDeletionOfExpiredSessions(): Promise<void> {
  schedule.scheduleJob(process.env["SESSION_DELETION_CRON_SCHEDULE"], deleteExpiredSessions);
  const childLogger = logger.child({ cronSchedule: process.env["SESSION_DELETION_CRON_SCHEDULE"] });
  childLogger.info("Scheduled deletion of expired sessions");
}

async function deleteExpiredSessions(): Promise<void> {
  logger.trace("Running scheduled deletion of expired sessions");
  await prisma.monoalphabeticSession.deleteMany({
    where: {
      expirationDate: {
        lt: new Date()
      }
    }
  });
}

export default scheduleDeletionOfExpiredSessions;
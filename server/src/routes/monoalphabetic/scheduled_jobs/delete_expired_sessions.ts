import schedule from "node-schedule";
import logger from "../../../../logger.js";
import { env as validEnv } from "../../../env.js";
import prisma from "../../../prisma/prisma-client.js";

async function scheduleDeletionOfExpiredSessions(): Promise<void> {
  schedule.scheduleJob(validEnv.SESSION_DELETION_CRON_SCHEDULE, deleteExpiredSessions);
  const childLogger = logger.child({ cronSchedule: validEnv.SESSION_DELETION_CRON_SCHEDULE });
  childLogger.info("Scheduled deletion of expired sessions");
}

async function deleteExpiredSessions(): Promise<void> {
  logger.trace("Running scheduled deletion of expired sessions");
  await prisma.monoalphabeticSession.deleteMany({
    where: {
      expirationDate: {
        lt: new Date(),
      },
    },
  });
}

export default scheduleDeletionOfExpiredSessions;

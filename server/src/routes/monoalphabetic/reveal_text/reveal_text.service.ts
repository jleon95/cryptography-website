import prisma from '../../../prisma/prisma-client.js';
const logger = require('../../../../logger');

export async function getOriginalText(sessionId: string): Promise<string> {

  const childLogger = logger.child({ sessionId });
  childLogger.trace("Retrieving original text for reveal request.");

  return await prisma.$transaction(async (tx) => {
    const monoalphabeticSessionInfo = await tx.monoalphabeticSession.findUnique({
      where: {
        sessionId: sessionId
      },
      select: {
        originalTextId: true,
        encryptionMapping: true
      }
    });

    if (!monoalphabeticSessionInfo) {
      childLogger.warn("MonoalphabeticSession not found during reveal request.");
      throw new Error(`MonoalphabeticSession not found for sessionId=${sessionId}`);
    }

    const originalTextRecord = await tx.originalText.findUnique({
      where: {
        id: monoalphabeticSessionInfo.originalTextId
      },
      select: {
        content: true
      }
    });

    if (!originalTextRecord) {
      childLogger.warn({ originalTextId: monoalphabeticSessionInfo?.originalTextId }, "Original text record not found during reveal request.");
    }

    return originalTextRecord!.content;
  });
}

export async function checkActiveMonoalphabeticSessionExists(sessionId: string): Promise<boolean> {

  let result = await prisma.monoalphabeticSession.findUnique({
    where: {
      sessionId: sessionId,
      expirationDate: {
        gte: new Date()
      }
    }
  });

  return result !== null;
}
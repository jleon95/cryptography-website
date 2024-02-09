import prisma from '../../../prisma/prisma-client';
import { Prisma } from '@prisma/client';
import { LetterMapping } from '../logic.models';
const logger = require('../../../../logger');

export async function getEncryptionMapping(sessionId: string): Promise<LetterMapping> {
  try {
    return (await prisma.textBeingDecrypted.findUnique({
      where: {
        sessionId: sessionId
      },
      select: {
        encryptionMapping: true
      }
    })).encryptionMapping as LetterMapping;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId, errorCode: e.code, errorMeta: e.meta });
      if (e.code == "P2003")
        childLogger.error("Error when attempting to access TextBeingDecrypted entry: session ID does not match any Session entry.");
      else if (e.code == "P2025")
        childLogger.error("Error when attempting to access TextBeingDecrypted entry: no entries associated with the given session ID exist.");
    }
  }
}
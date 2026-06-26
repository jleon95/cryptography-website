import prisma from '../../../prisma/prisma-client';
import { Prisma } from '@prisma/client';
import type { EncryptedTextInfo, LetterMapping } from '../logic.models';
const logger = require('../../../../logger');

export async function getOriginalTextAndMappingFromMonoalphabeticSession(sessionId: string): Promise<EncryptedTextInfo> {

  const childLogger = logger.child({ sessionId });

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
      const childLogger = logger.child({ sessionId });
      childLogger.warn("MonoalphabeticSession not found.");
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
      const childLogger = logger.child({ sessionId });
      childLogger.error({ originalTextId: monoalphabeticSessionInfo.originalTextId }, "Original text record missing for MonoalphabeticSession.");
      throw new Error(`Original text not found for id=${monoalphabeticSessionInfo.originalTextId}`);
    }

    return {
      text: originalTextRecord.content,
      letterMapping: monoalphabeticSessionInfo.encryptionMapping as LetterMapping
    };
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


export async function touchMonoalphabeticSession(sessionId: string, expirationDate: Date): Promise<void> {

  try {
    await prisma.monoalphabeticSession.update({
      where: {
        sessionId: sessionId
      },
      data: {
        expirationDate: expirationDate
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId, errorCode: e.code, errorMeta: e.meta });
      childLogger.error("Error when attempting to touch existing MonoalphabeticSession entry.");
    }
  }
}
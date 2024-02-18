import prisma from '../../../prisma/prisma-client';
import { Prisma } from '@prisma/client';
import { LetterMapping } from '../logic.models';
const logger = require('../../../../logger');

export async function getEncryptionMapping(sessionId: string): Promise<LetterMapping> {
  try {
    return (await prisma.monoalphabeticSession.findUnique({
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
      childLogger.error("Error when attempting to access existing MonoalphabeticSession entry.");
    }
  }
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

export async function getRemainingHints(sessionId: string): Promise<number> {
  try {
    const result = await prisma.monoalphabeticSession.findUnique({
      where: {
        sessionId: sessionId
      },
      select: {
        maxHints: true,
        hintsUsed: true
      }
    });
    return result.maxHints - result.hintsUsed;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId, errorCode: e.code, errorMeta: e.meta });
      childLogger.error("Error when attempting to access existing MonoalphabeticSession entry.");
    }
  }
}

export async function consumeHint(sessionId: string): Promise<void> {
  try {
    await prisma.monoalphabeticSession.update({
      where: {
        sessionId: sessionId
      },
      data: {
        hintsUsed: { increment: 1 }
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId, errorCode: e.code, errorMeta: e.meta });
      childLogger.error("Error when attempting to update existing MonoalphabeticSession entry.");
    }
  }
}
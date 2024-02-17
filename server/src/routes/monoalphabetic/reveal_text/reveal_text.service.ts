import prisma from '../../../prisma/prisma-client';
import { Prisma } from '@prisma/client';
const logger = require('../../../../logger');

export async function getOriginalText(sessionId: string): Promise<string> {

  const monoalphabeticSessionInfo = (await prisma.monoalphabeticSession.findUnique({
    where: {
      sessionId: sessionId
    },
    select: {
      originalTextId: true,
      encryptionMapping: true
    }
  }));

  return (await prisma.originalText.findUnique({
    where: {
      id: monoalphabeticSessionInfo.originalTextId
    },
    select: {
      content: true
    }
  })).content;
}

export async function checkMonoalphabeticSessionExists(sessionId: string): Promise<boolean> {

  let result = await prisma.monoalphabeticSession.findUnique({
    where: {
      sessionId: sessionId
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
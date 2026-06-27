import prisma from '../../../prisma/prisma-client.js';
import type { LetterMapping } from '../logic.models.js';
import type { ChosenOriginalTextInfo } from '../service.models.js';
import { Prisma } from '@prisma/client';
import logger from '../../../../logger.js';

export async function chooseNewText(): Promise<ChosenOriginalTextInfo> {

  return await prisma.$transaction(async (tx) => {
    const totalOriginalTexts: number = await tx.originalText.count();
    if (totalOriginalTexts === 0) {
      const childLogger = logger.child({ totalOriginalTexts });
      childLogger.error("Error when attempting to choose new text (no texts found in database).");
    }
    const randomIndex = Math.floor(Math.random() * totalOriginalTexts) + 1;
    const [randomTextRecord] = await tx.originalText.findMany({
      skip: randomIndex - 1,
      take: 1,
    });

    if (!randomTextRecord) {
      throw new Error('Unable to retrieve the chosen new text.');
    }

    return { text: randomTextRecord.content, id: randomTextRecord.id };
  });
}

export async function insertMonoalphabeticSession(sessionId: string, expirationDate: Date, letterMapping: LetterMapping, originalTextId: number, maxHints: number): Promise<void> {

  try {
    await prisma.monoalphabeticSession.create({
      data: {
        sessionId: sessionId,
        expirationDate: expirationDate,
        originalTextId: originalTextId,
        encryptionMapping: letterMapping,
        hintsUsed: 0,
        maxHints: maxHints
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId, errorCode: e.code, errorMeta: e.meta });
      childLogger.error("Error when attempting to create new MonoalphabeticSession entry.");
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

export async function deleteMonoalphabeticSession(sessionId: string): Promise<void> {

  try {
    await prisma.monoalphabeticSession.delete({
      where: {
        sessionId: sessionId
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId, errorCode: e.code, errorMeta: e.meta });
      childLogger.error("Error when attempting to delete existing MonoalphabeticSession entry.");
    }
  }
}
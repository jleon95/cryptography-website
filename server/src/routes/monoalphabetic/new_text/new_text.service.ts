import prisma from '../../../prisma/prisma-client';
import type { LetterMapping } from '../logic.models';
import type { ChosenOriginalTextInfo } from '../service.models';
import { Prisma } from '@prisma/client';
const logger = require('../../../../logger');

export async function chooseNewText(): Promise<ChosenOriginalTextInfo> {

  const ids: {id: number}[] = await prisma.originalText.findMany({
    select: {
      id: true,
      content: false,
    },
  });
  const chosenId = ids[Math.floor(Math.random() * ids.length)].id;
  const chosenText: string = (await prisma.originalText.findUnique({
    where: {
      id: chosenId
    },
    select: {
      id: false,
      content: true
    },
  })).content;

  return { text: chosenText, id: chosenId };
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
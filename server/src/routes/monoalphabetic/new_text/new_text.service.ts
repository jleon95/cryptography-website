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

export async function insertSession(sessionId: string, expirationDate: Date, data): Promise<void> {
  await prisma.session.create({
    data: {
      id: sessionId,
      expiresAt: expirationDate,
      data: data
    }
  });
}

export async function checkSessionExists(sessionId: string): Promise<boolean> {

  let result = await prisma.session.findUnique({
    where: {
      id: sessionId
    }
  });

  return result !== null;
}

export async function touchSession(sessionId: string, expirationDate: Date): Promise<void> {

  try {
    await prisma.session.update({
      where: {
        id: sessionId
      },
      data: {
        expiresAt: expirationDate
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId });
      if (e.code == "P2025")
        childLogger.error("Error when attempting to touch existing Session entry: no entries exist with the provided session ID.");
    }
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  await prisma.session.delete({
    where: {
      id: sessionId
    }
  });
}

export async function insertTextToBeDecrypted(letterMapping: LetterMapping, originalTextId: number, sessionId: string, deletePreviousEncryptedText: boolean = false): Promise<void> {

  if (deletePreviousEncryptedText) {
    await deleteTextToBeDecryptedBySessionId(sessionId);
  }

  try {
    await prisma.textBeingDecrypted.create({
      data: {
        encryptionMapping: letterMapping,
        originalTextId: originalTextId,
        sessionId: sessionId
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId, errorCode: e.code, errorMeta: e.meta });
      if (e.code == "P2003")
        childLogger.error("Error when attempting to create new TextBeingDecrypted entry: session ID does not match any Session entry.");
    }
  }
}

export async function deleteTextToBeDecryptedBySessionId(sessionId: string): Promise<void> {
  try {
    await prisma.textBeingDecrypted.delete({
      where: {
        sessionId: sessionId
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId, errorCode: e.code, errorMeta: e.meta });
      if (e.code == "P2025")
        childLogger.error("Error when attempting to delete TextBeingDecrypted entry: no entries associated with the given session ID exist.");
    }
  }
}
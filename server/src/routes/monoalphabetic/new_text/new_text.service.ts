import prisma from '../../../prisma/prisma-client';
import type { LetterMapping } from './new_text.logic';
import { Prisma } from '@prisma/client';
const logger = require('../../../../logger');

export interface ChosenTextInfo {
  text: string,
  id: number
}

export async function chooseNewText(): Promise<ChosenTextInfo> {
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

export async function insertSession(sessionId: string, maxAge: number, data) {
  await prisma.session.create({
    data: {
      id: sessionId,
      expiresAt: new Date((new Date().getTime()) + maxAge),
      data: data
    }
  });
}

export async function checkSessionExists(sessionId: string) {

  let result = await prisma.session.findUnique({
    where: {
      id: sessionId
    }
  });

  return result !== null;
}

export async function touchSession(sessionId: string, maxAge: number) {

  try {
    await prisma.session.update({
      where: {
        id: sessionId
      },
      data: {
        expiresAt: new Date((new Date().getTime()) + maxAge)
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

export async function deleteSession(sessionId: string) {
  await prisma.session.delete({
    where: {
      id: sessionId
    }
  });
}

export async function insertTextToBeDecrypted(letterMapping: LetterMapping, originalTextId: number, sessionId: string, deletePreviousEncryptedText: boolean = false) {

  try {
    if (deletePreviousEncryptedText) {
      await deleteTextToBeDecryptedBySessionId(sessionId);
    }

    await prisma.textBeingDecrypted.create({
      data: {
        encryptionMapping: letterMapping,
        originalTextId: originalTextId,
        sessionId: sessionId
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId });
      if (e.code == "P2025")
        childLogger.error("Error when attempting to create new TextBeingDecrypted entry: session ID does not match any Session entry.");
    }
  }
}

export async function deleteTextToBeDecryptedBySessionId(sessionId: string) {
  try {
    await prisma.textBeingDecrypted.delete({
      where: {
        sessionId: sessionId
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId });
      if (e.code == "P2025")
        childLogger.error("Error when attempting to delete TextBeingDecrypted entry: session ID does not match any Session entry.");
    }
    throw e;
  }
}
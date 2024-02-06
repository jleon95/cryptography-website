import prisma from '../../../prisma/prisma-client';
import type { LetterMapping } from './new_text.logic';

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

export async function touchSession(sessionId: string, maxAge: number) {
  await prisma.session.update({
    where: {
      id: sessionId
    },
    data: {
      expiresAt: new Date((new Date().getTime()) + maxAge)
    }
  })
}

export async function deleteSession(sessionId: string) {
  await prisma.session.delete({
    where: {
      id: sessionId
    }
  });
}

export async function insertTextToBeDecrypted(letterMapping: LetterMapping, originalTextId: number, sessionId: string, deletePreviousEncryptedText: boolean = false) {

  if (deletePreviousEncryptedText)
    await deleteTextToBeDecryptedBySessionId(sessionId);

  await prisma.textBeingDecrypted.create({
    data: {
      encryptionMapping: letterMapping,
      originalTextId: originalTextId,
      sessionId: sessionId
    }
  });
}

export async function deleteTextToBeDecryptedBySessionId(sessionId: string) {
  await prisma.textBeingDecrypted.delete({
    where: {
      sessionId: sessionId
    }
  });
}
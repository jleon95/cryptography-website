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
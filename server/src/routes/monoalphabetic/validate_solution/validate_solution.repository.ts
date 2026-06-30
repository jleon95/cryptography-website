import { Prisma } from "@prisma/client";
import logger from "../../../../logger.js";
import prisma from "../../../prisma/prisma-client.js";
import type { LetterMapping } from "../service.models.js";

export async function getEncryptionMapping(sessionId: string): Promise<LetterMapping> {
  const session = await prisma.monoalphabeticSession.findUnique({
    where: {
      sessionId: sessionId,
    },
    select: {
      encryptionMapping: true,
    },
  });

  if (!session) {
    const childLogger = logger.child({ sessionId });
    childLogger.warn(
      "MonoalphabeticSession not found when attempting to access encryption mapping.",
    );
    throw new Error(`MonoalphabeticSession not found for sessionId=${sessionId}`);
  }

  return session.encryptionMapping as LetterMapping;
}

export async function checkActiveMonoalphabeticSessionExists(sessionId: string): Promise<boolean> {
  const result = await prisma.monoalphabeticSession.findUnique({
    where: {
      sessionId: sessionId,
      expirationDate: {
        gte: new Date(),
      },
    },
  });

  return result !== null;
}

export async function touchMonoalphabeticSession(
  sessionId: string,
  expirationDate: Date,
): Promise<void> {
  try {
    await prisma.monoalphabeticSession.update({
      where: {
        sessionId: sessionId,
      },
      data: {
        expirationDate: expirationDate,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const childLogger = logger.child({ sessionId, errorCode: e.code, errorMeta: e.meta });
      childLogger.error("Error when attempting to touch existing MonoalphabeticSession entry.");
    }
  }
}

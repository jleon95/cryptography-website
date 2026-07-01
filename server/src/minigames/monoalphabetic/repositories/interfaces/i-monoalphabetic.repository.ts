import type { PrismaClient } from "@prisma/client";
import type { LetterMapping } from "../../dtos/logic.dto.js";

export type GetSessionResponse = {
  originalTextId: number;
  encryptionMapping: LetterMapping;
};

export interface IMonoalphabeticRepository {
  getNumberOfTextsInDatabase(tx?: PrismaClient): Promise<number>;

  getTextByOffset(offset: number, tx?: PrismaClient): Promise<string>;

  createSession(
    sessionId: string,
    expirationDate: Date,
    originalTextId: number,
    encryptionMapping: LetterMapping,
    tx?: PrismaClient,
  ): Promise<void>;

  getSessionById(sessionId: string, tx?: PrismaClient): Promise<GetSessionResponse>;

  updateSession(
    sessionId: string,
    expirationDate: Date,
    isHintConsumed?: boolean,
    tx?: PrismaClient,
  ): Promise<void>;

  deleteSession(sessionId: string, tx?: PrismaClient): Promise<void>;
}

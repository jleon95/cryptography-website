
import type { PrismaClient } from "@prisma/client";
import type { LetterMapping } from "../../dtos/logic.dto.js";

export type GetRandomTextResponse = {
  newText: string;
  newSessionId: string;
};

export type GetSessionResponse = {
  originalTextId: number;
  encryptionMapping: LetterMapping;
};

export interface IMonoalphabeticRepository {
  getRandomText(
    keepSpaces: boolean,
    keepPunctuation: boolean,
    tx?: PrismaClient,
  ): Promise<GetRandomTextResponse>;

  createSession(
    originalTextId: number,
    encryptionMapping: LetterMapping,
    tx?: PrismaClient,
  ): Promise<string>;

  getSessionById(
    sessionId: string,
    tx?: PrismaClient,
  ): Promise<GetSessionResponse>;

  updateSession(
    sessionId: string,
    isHintConsumed?: boolean,
    keepSpaces?: boolean,
    keepPunctuation?: boolean,
    tx?: PrismaClient,
  ): Promise<void>;
}
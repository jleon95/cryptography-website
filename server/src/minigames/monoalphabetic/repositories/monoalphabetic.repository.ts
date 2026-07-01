import type { PrismaClient } from "@prisma/client";
import type { LetterMapping } from "../dtos/logic.dto.js";
import type {
  GetRandomTextResponse,
  GetSessionResponse,
  IMonoalphabeticRepository,
} from "./interfaces/i-monoalphabetic.repository.js";

export class MonoalphabeticRepository implements IMonoalphabeticRepository {
  constructor(private prisma: PrismaClient) {}

  public async getRandomText(
    keepSpaces: boolean,
    keepPunctuation: boolean,
    tx = this.prisma,
  ): Promise<GetRandomTextResponse> {}

  public async createSession(
    originalTextId: number,
    encryptionMapping: LetterMapping,
    tx = this.prisma,
  ): Promise<string> {}

  public async getSessionById(sessionId: string, tx = this.prisma): Promise<GetSessionResponse> {}

  public async updateSession(
    sessionId: string,
    isHintConsumed?: boolean,
    keepSpaces?: boolean,
    keepPunctuation?: boolean,
    tx = this.prisma,
  ): Promise<void> {}
}

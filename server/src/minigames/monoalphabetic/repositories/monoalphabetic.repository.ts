import { Prisma, type PrismaClient } from "@prisma/client";
import { AppError, ConflictError, NotFoundError } from "../../../core/errors/errors.js";
import { env as validEnv } from "../../../env.js";
import type { LetterMapping } from "../dtos/logic.dto.js";
import type {
  GetSessionResponse,
  IMonoalphabeticRepository,
} from "./interfaces/i-monoalphabetic.repository.js";

export class MonoalphabeticRepository implements IMonoalphabeticRepository {
  constructor(private prisma: PrismaClient) {}

  public async getNumberOfTextsInDatabase(tx = this.prisma): Promise<number> {
    try {
      return await tx.originalText.count();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundError("Failed to get number of texts in database.");
      }
      throw new AppError("Failed to get number of texts in database.", 500, false);
    }
  }

  public async getTextByOffset(offset: number, tx = this.prisma): Promise<string> {
    try {
      const [randomTextRecord] = await tx.originalText.findMany({
        skip: offset - 1,
        take: 1,
      });
      if (!randomTextRecord) {
        throw new NotFoundError("Monoalphabetic text not found in database.");
      }
      return randomTextRecord.content;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Failed to get monoalphabetic text from database.", 500, false);
      }
    }
  }

  public async createSession(
    sessionId: string,
    expirationDate: Date,
    originalTextId: number,
    encryptionMapping: LetterMapping,
    tx = this.prisma,
  ): Promise<void> {
    try {
      await tx.monoalphabeticSession.create({
        data: {
          encryptionMapping: encryptionMapping,
          expirationDate: expirationDate,
          hintsUsed: 0,
          maxHints: validEnv.MAX_HINTS,
          originalTextId: originalTextId,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictError(`Monoalphabetic session already exists.`);
        } else if (error.code === "P2003") {
          throw new NotFoundError(`Monoalphabetic text not found.`);
        }
      }
      throw new AppError("Failed to create monoalphabetic session.", 500, false);
    }
  }

  public async getSessionById(sessionId: string, tx = this.prisma): Promise<GetSessionResponse> {
    try {
      const session = await tx.monoalphabeticSession.findUniqueOrThrow({
        where: {
          sessionId,
        },
        select: {
          encryptionMapping: true,
          expirationDate: true,
          hintsUsed: true,
          originalTextId: true,
        },
      });
      return {
        encryptionMapping: session.encryptionMapping,
        expirationDate: session.expirationDate,
        hintsUsed: session.hintsUsed,
        originalTextId: session.originalTextId,
      } as GetSessionResponse;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Monoalphabetic session not found.");
        }
      }
      throw new AppError("Failed to get monoalphabetic session.", 500, false);
    }
  }

  public async updateSession(
    sessionId: string,
    expirationDate: Date,
    isHintConsumed?: boolean,
    tx = this.prisma,
  ): Promise<void> {
    if (!isHintConsumed) {
      return;
    }

    try {
      await tx.monoalphabeticSession.update({
        where: {
          sessionId,
        },
        data: {
          hintsUsed: { increment: 1 },
          expirationDate: expirationDate,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Monoalphabetic session not found.");
        }
      }
      throw new AppError("Failed to update monoalphabetic session.", 500, false);
    }
  }

  public async deleteSession(sessionId: string, tx = this.prisma): Promise<void> {
    try {
      await tx.monoalphabeticSession.delete({
        where: {
          sessionId: sessionId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Monoalphabetic session not found.");
        }
      }
      throw new AppError("Failed to delete monoalphabetic session.", 500, false);
    }
  }
}

import type { LetterMapping, ValidatedLetterMapping } from "../dtos/logic.dto.js";
import type { IMonoalphabeticRepository } from "../repositories/interfaces/i-monoalphabetic.repository.js";

export type StartNewSessionResponse = {
  newText: string;
  newSessionId: string;
};

export class MonoalphabeticService {
  constructor(private monoalphabeticRepository: IMonoalphabeticRepository) {}

  public async startNewSession(
    keepSpaces: boolean,
    keepPunctuation: boolean,
    previousSessionId?: string,
  ): Promise<StartNewSessionResponse> {}

  public async generateHint(sessionId: string): Promise<string> {}

  public async validateMapping(
    sessionId: string,
    userMapping: LetterMapping,
  ): Promise<ValidatedLetterMapping> {}

  public async updateDifficulty(
    sessionId: string,
    keepSpaces: boolean,
    keepPunctuation: boolean,
  ): Promise<void> {}

  public async revealText(sessionId: string): Promise<string> {}
}

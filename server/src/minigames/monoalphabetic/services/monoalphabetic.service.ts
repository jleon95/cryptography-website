import type { LetterMapping, ValidatedLetterMapping } from "../dtos/logic.dto.js";
import type { IMonoalphabeticRepository } from "../repositories/interfaces/i-monoalphabetic.repository.js";
import { createExpirationDate, createNewEncryptedText } from "./monoalphabetic.logic.js";

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
  ): Promise<StartNewSessionResponse> {
    if (typeof previousSessionId !== "undefined") {
      await this.monoalphabeticRepository.deleteSession(previousSessionId);
    }

    const numberOfTextsInDatabase =
      await this.monoalphabeticRepository.getNumberOfTextsInDatabase();
    const randomTextIndex = Math.floor(Math.random() * numberOfTextsInDatabase) + 1;
    const newText = await this.monoalphabeticRepository.getTextByOffset(randomTextIndex);
    const encryptedTextInfo = createNewEncryptedText(newText, keepSpaces, keepPunctuation);
    const newSessionId = crypto.randomUUID();
    await this.monoalphabeticRepository.createSession(
      newSessionId,
      createExpirationDate(),
      randomTextIndex,
      encryptedTextInfo.letterMapping,
    );
    return { newText: encryptedTextInfo.encryptedText, newSessionId };
  }

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

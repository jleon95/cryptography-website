import { MonoalphabeticNoHintsLeftError } from "../../../core/errors/errors.js";
import { env as validEnv } from "../../../env.js";
import type { LetterMapping, ValidatedLetterMapping } from "../dtos/logic.dto.js";
import type {
  GetSessionResponse,
  IMonoalphabeticRepository,
} from "../repositories/interfaces/i-monoalphabetic.repository.js";
import {
  createExpirationDate,
  createNewEncryptedText,
  findCorrectLetterFromMapping,
} from "./monoalphabetic.logic.js";

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

  public async generateHint(sessionId: string, requestedLetter: string): Promise<string> {
    const currentSession: GetSessionResponse =
      await this.monoalphabeticRepository.getSessionById(sessionId);

    if (currentSession.hintsUsed >= validEnv.MAX_HINTS) {
      throw new MonoalphabeticNoHintsLeftError("Maximum number of hints reached for this session.");
    }
    await this.monoalphabeticRepository.updateSession(
      sessionId,
      createExpirationDate(),
      true,
    );
    const correctLetter: string = findCorrectLetterFromMapping(
      requestedLetter,
      currentSession.encryptionMapping,
    );
    return correctLetter;
  }

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

import { LetterMapping, ValidatedLetterMapping } from './logic.models';

// Format of new text requests from the front-end
export interface NewTextRequest {
  difficultyOptions: {
    keepSpaces: boolean,
    keepPunctuation: boolean
  },
  sessionData: {
    sessionId: string,
  }
}

// JSONify-able response body for new text requests from the front-end
export interface NewTextResponse {
  sessionData: {
    sessionId?: string,
    expirationDate: Date
  },
  encryptedText: string
}

// Format of validation requests from the front-end
export interface ValidationRequest {
  sessionData: {
    sessionId: string
  }
  letterMapping: LetterMapping,
}

// JSONify-able response body for validation requests from the front-end
export interface ValidationResponse {
  validatedLetterMapping: ValidatedLetterMapping
}

// Format of hint requests from the front-end
export interface HintRequest {
  requestedLetter: string,
  sessionData: {
    sessionId: string
  }
}

// JSONify-able response body for hint requests from the front-end
export interface HintResponse {
  correctLetter: string
}
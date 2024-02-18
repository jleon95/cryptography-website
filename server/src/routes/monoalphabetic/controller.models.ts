import { LetterMapping, ValidatedLetterMapping } from './logic.models';

export interface NewTextRequest {
  difficultyOptions: {
    keepSpaces: boolean,
    keepPunctuation: boolean
  },
  sessionData: {
    sessionId: string,
  }
}

export interface NewTextResponse {
  encryptedText: string
  sessionData?: {
    sessionId: string,
    expirationDate: Date
  },
}

export interface UpdateTextRequest {
  difficultyOptions: {
    keepSpaces: boolean,
    keepPunctuation: boolean
  },
  sessionData: {
    sessionId: string,
  }
}

export interface UpdateTextResponse {
  encryptedText: string
  sessionData?: {
    expirationDate: Date
  }
}

export interface RevealTextRequest {
  sessionData: {
    sessionId: string
  }
}

export interface RevealTextResponse {
  originalText: string
  sessionData?: {}
}

export interface ValidationRequest {
  sessionData: {
    sessionId: string
  }
  letterMapping: LetterMapping,
}

export interface ValidationResponse {
  validatedLetterMapping: ValidatedLetterMapping
  sessionData?: {
    expirationDate: Date
  }
}

export interface HintRequest {
  requestedLetter: string,
  sessionData: {
    sessionId: string
  }
}

export interface HintResponse {
  correctLetter: string
  sessionData?: {
    expirationDate: Date
  }
}
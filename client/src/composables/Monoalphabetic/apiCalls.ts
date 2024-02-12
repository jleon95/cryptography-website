export async function callAPI(action: Action, parameters: NewTextRequest|UpdateTextRequest|ValidationRequest|HintRequest): Promise<NewTextResponse|UpdateTextResponse|ValidationResponse|HintResponse> {

  return (await fetch(`http://localhost:1337/monoalphabetic/${action}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(parameters)
  })).json();
}

export enum Action {
  NEW_TEXT = "new_text",
  UPDATE_TEXT = "update_text",
  REQUEST_HINT = "hint",
  VALIDATION = "validation"
}

export interface NewTextResponse {
  sessionData: {
    sessionId: string,
    expirationDate?: Date
  },
  encryptedText: string
}

export interface NewTextRequest {
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

export interface ValidationResponse {
  validatedLetterMapping: { [original: string]: boolean }
}

export interface ValidationRequest {
  letterMapping: { [letter: string]: string },
  sessionData: {
    sessionId: string
  }
}

export interface HintResponse {
  correctLetter: string
}

export interface HintRequest {
  requestedLetter: string,
  sessionData: {
    sessionId: string
  }
}
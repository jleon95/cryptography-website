export async function callAPI(action: Action, parameters: NewTextRequest|ValidationRequest): Promise<NewTextResponse|ValidationResponse> {

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
  CURRENT_TEXT = "current_text",
  HINT = "hint",
  VALIDATION = "validation"
}

export interface NewTextResponse {
  sessionData: {
    sessionId?: string,
    expirationDate: Date
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

export interface ValidationResponse {
  validatedLetterMapping: { [original: string]: boolean }
}

export interface ValidationRequest {
  letterMapping: { [letter: string]: string },
  sessionData: {
    sessionId: string
  }
}
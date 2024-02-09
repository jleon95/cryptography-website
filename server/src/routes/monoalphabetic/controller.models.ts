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
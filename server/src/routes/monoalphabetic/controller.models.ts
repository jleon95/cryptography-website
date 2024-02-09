// JSONify-able response body for new text requests from the front-end
export interface NewTextResponse {
  sessionData: {
    sessionId?: string,
    expirationDate: Date
  },
  encryptedText: string
}
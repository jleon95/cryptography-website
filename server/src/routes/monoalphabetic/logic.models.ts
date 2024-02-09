// Represents a permutation of the original letters used in a given text
export interface LetterMapping {
  [original: string]: string // originalLetter: newLetter
}

// Output of encryption logic
export interface EncryptedTextInfo {
  text: string,
  letterMapping: LetterMapping
}

// Options for encryption requests from the front-end
export interface PreProcessOptions {
  keepSpaces: boolean,
  keepPunctuation: boolean
}

// For each letter sent to validation, true/false depending on whether the user was right
export interface ValidatedLetterMapping {
  [original: string]: boolean
}
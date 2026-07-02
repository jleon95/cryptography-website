import { env as validEnv } from "../../../env.js";
import type { LetterMapping } from "../dtos/logic.dto.js";

// --- Expiration dates for monoalphabetic sessions ---
export function createExpirationDate(): Date {
  return new Date(Date.now() + validEnv.SESSION_DURATION);
}

// --- Functionality for encrypting a given text using a monoalphabetic cipher ---
export function createNewEncryptedText(
  newText: string,
  keepSpaces: boolean = false,
  keepPunctuation: boolean = false,
): { encryptedText: string; letterMapping: LetterMapping } {
  newText = newText
    .normalize("NFD")
    .replace(/[\u0301|\u0308]/gu, "")
    .toUpperCase(); // Remove accents and diaeresis
  newText = newText.replace(/N\u0303/gu, "\u00D1"); // Swap N + ~ modifier for the proper character
  newText = keepSpaces ? newText : newText.replace(/\s/gu, "");
  newText = keepPunctuation ? newText : newText.replace(/\p{Punctuation}/gu, "");
  return encryptText(newText);
}

function encryptText(text: string): { encryptedText: string; letterMapping: LetterMapping } {
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  const shuffledLetters = shuffleLetters(letters);
  const mapping: LetterMapping = {};

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const shuffledLetter = shuffledLetters[i];

    if (letter === undefined || shuffledLetter === undefined) continue;

    mapping[letter] = shuffledLetter;
  }

  // Careful: the text may contain characters that are not in the letter mapping, such as spaces or punctuation. Those should be left unchanged.
  const newText = text.replace(/./g, (character: string): string => {
    return mapping[character] !== undefined ? mapping[character] : character;
  });

  return { encryptedText: newText, letterMapping: mapping };
}

// Fisher-Yates shuffle
function shuffleLetters(array: Array<string>): Array<string> {
  const newArray = [...array];
  let currentIndex = newArray.length,
    randomIndex: number;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    const currentValue = newArray[currentIndex];
    const randomValue = newArray[randomIndex];

    if (currentValue === undefined || randomValue === undefined) continue;

    newArray[currentIndex] = randomValue;
    newArray[randomIndex] = currentValue;
  }

  return newArray;
}

// --- Functionality for generating hints based on a given letter mapping ---
export function findCorrectLetterFromMapping(
  requestedLetter: string,
  letterMapping: LetterMapping,
): string {
  for (const letter in letterMapping) {
    if (letterMapping[letter] === requestedLetter) {
      return letter;
    }
  }

  throw new Error(`No mapping found for requested letter '${requestedLetter}'`);
}

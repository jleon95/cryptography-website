import { PreProcessOptions, LetterMapping, EncryptedTextInfo } from '../logic.models';

function encryptTextFromExistingMapping(text: string, existingMapping: LetterMapping): string {

  let letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

  let newText: Array<string> = text.split("");

  for (let i = 0; i < text.length; i++)
    if (text[i] in existingMapping)
      newText[i] = existingMapping[text[i]];

  return newText.join("");
}

export async function reCreateEncryptedText(existingEncryptedTextInfo: EncryptedTextInfo, options: PreProcessOptions): Promise<string> {

  let newText = existingEncryptedTextInfo.text.normalize("NFD").replace(/[\u0301|\u0308]/gu, "").toUpperCase(); // Remove accents and diaeresis
  newText = newText.replace(/N\u0303/gu, "\u00D1"); // Swap N + ~ modifier for the proper character
  newText = options.keepSpaces ? newText : newText.replace(/\s/gu, "");
  newText = options.keepPunctuation ? newText : newText.replace(/\p{Punctuation}/gu, "");
  return encryptTextFromExistingMapping(newText, existingEncryptedTextInfo.letterMapping);
}
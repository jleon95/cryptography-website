import type { EncryptedTextInfo, LetterMapping, PreProcessOptions } from "../service.models.js";

function encryptTextFromExistingMapping(text: string, existingMapping: LetterMapping): string {
  // Careful: the text may contain characters that are not in the letter mapping, such as spaces or punctuation. Those should be left unchanged.
  return text.replace(/./g, (character: string): string => {
    return existingMapping[character] !== undefined ? existingMapping[character] : character;
  });
}

export async function reCreateEncryptedText(
  existingEncryptedTextInfo: EncryptedTextInfo,
  options: PreProcessOptions,
): Promise<string> {
  let newText = existingEncryptedTextInfo.text
    .normalize("NFD")
    .replace(/[\u0301|\u0308]/gu, "")
    .toUpperCase(); // Remove accents and diaeresis
  newText = newText.replace(/N\u0303/gu, "\u00D1"); // Swap N + ~ modifier for the proper character
  newText = options.keepSpaces ? newText : newText.replace(/\s/gu, "");
  newText = options.keepPunctuation ? newText : newText.replace(/\p{Punctuation}/gu, "");
  return encryptTextFromExistingMapping(newText, existingEncryptedTextInfo.letterMapping);
}

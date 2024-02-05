export interface PreProcessOptions {
  keepSpaces: boolean,
  keepPunctuation: boolean
}

export function preprocessNewText(newText: string, options: PreProcessOptions = { keepSpaces: false, keepPunctuation: false }) {
  let cleanNewText: string = newText.normalize("NFD").replace(/[\u0301|\u0308]/gu, "").toUpperCase(); // Removes accents and diaeresis
  cleanNewText = options.keepSpaces ? cleanNewText : cleanNewText.replace(/\s/gu, "");
  cleanNewText = options.keepPunctuation ? cleanNewText : cleanNewText.replace(/\p{Punctuation}/gu, "");
  return cleanNewText;
}
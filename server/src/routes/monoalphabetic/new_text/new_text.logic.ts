import { PreProcessOptions, LetterMapping, EncryptedTextInfo } from '../logic.models.js';

// Fisher-Yates shuffle
function shuffle(array: Array<string>): Array<string> {

  let newArray = [...array];
  let currentIndex = newArray.length, randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    const currentValue = newArray[currentIndex];
    const randomValue = newArray[randomIndex];

    if (currentValue === undefined || randomValue === undefined)
      continue;

    newArray[currentIndex] = randomValue;
    newArray[randomIndex] = currentValue;
  }

  return newArray;
}

function encryptText(text: string): EncryptedTextInfo {

  const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const shuffledLetters = shuffle(letters);
  const mapping: LetterMapping = {};

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const shuffledLetter = shuffledLetters[i];

    if (letter === undefined || shuffledLetter === undefined)
      continue;

    mapping[letter] = shuffledLetter;
  }

  // Careful: the text may contain characters that are not in the letter mapping, such as spaces or punctuation. Those should be left unchanged.
  const newText = text.replace(/./g, (character: string): string => {
    return mapping[character] !== undefined ? mapping[character] : character;
  });

  return { text: newText, letterMapping: mapping };
}

export async function createNewEncryptedText(newText: string, options: PreProcessOptions = { keepSpaces: false, keepPunctuation: false }): Promise<EncryptedTextInfo> {

  newText = newText.normalize("NFD").replace(/[\u0301|\u0308]/gu, "").toUpperCase(); // Remove accents and diaeresis
  newText = newText.replace(/N\u0303/gu, "\u00D1"); // Swap N + ~ modifier for the proper character
  newText = options.keepSpaces ? newText : newText.replace(/\s/gu, "");
  newText = options.keepPunctuation ? newText : newText.replace(/\p{Punctuation}/gu, "");
  return encryptText(newText);
}
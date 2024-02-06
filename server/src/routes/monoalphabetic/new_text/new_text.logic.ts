﻿interface PreProcessOptions {
  keepSpaces: boolean,
  keepPunctuation: boolean
}

export interface LetterMapping {
  [original: string]: string // originalLetter: newLetter
}

export interface EncryptedTextInfo {
  text: string,
  letterMapping: LetterMapping
}

// Fisher-Yates shuffle
function shuffle(array: Array<string>) {

  let currentIndex = array.length, randomIndex;

  while (currentIndex > 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function encryptText(text: string): EncryptedTextInfo {

  let letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  let shuffledLetters = shuffle(letters.split(""));
  let mapping: LetterMapping = {};

  for (let i = 0; i < letters.length; i++)
    mapping[letters[i]] = shuffledLetters[i];

  let newText: Array<string> = text.split("");

  for (let i = 0; i < text.length; i++)
    if (text[i] in mapping)
      newText[i] = mapping[text[i]];

  return { text: newText.join(""), letterMapping: mapping };
}

export async function createNewEncryptedText(newText: string, options: PreProcessOptions = { keepSpaces: false, keepPunctuation: false }): Promise<EncryptedTextInfo> {

  newText = newText.normalize("NFD").replace(/[\u0301|\u0308]/gu, "").toUpperCase(); // Removes accents and diaeresis
  newText = options.keepSpaces ? newText : newText.replace(/\s/gu, "");
  newText = options.keepPunctuation ? newText : newText.replace(/\p{Punctuation}/gu, "");
  return encryptText(newText);
}
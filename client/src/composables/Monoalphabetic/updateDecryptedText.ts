import { useTextStore } from './textStore';

const allowedLetterInputSet: Set<string> = new Set("abcdefghijklmnñopqrstuvwxyz");
const allowedInputSet: Set<string> = new Set("abcdefghijklmnñopqrstuvwxyz");
allowedInputSet.add("Backspace");

export function processKeyDown(e: KeyboardEvent) {
  if (!allowedInputSet.has(e.key) || (e.currentTarget as HTMLElement).textContent!.length > 0 && e.key != "Backspace")
    e.preventDefault();
}

export function processKeyUp(e: KeyboardEvent) {

  const textStore = useTextStore();
  const originalLetter: string = (e.currentTarget as HTMLElement).previousSibling!.textContent!;

  if (allowedLetterInputSet.has(e.key))
    textStore.assignedLetters[originalLetter] = e.key
  else if (e.key == "Backspace")
    textStore.assignedLetters[originalLetter] = originalLetter;
}
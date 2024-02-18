export function resetEncryptionBackgroundMovementAnimation() {

  setTimeout(function () {
    for (let i = 0; i < 24; i++) {
      const encryptedExampleGridElement: HTMLElement = document.getElementById(`cipher-example-${i}`)!;
      encryptedExampleGridElement.classList.remove("from-green-to-blue-background", "from-blue-to-green-background");
    }
  }, 700);
}

export function resetEncryptionTextAnimation() {
  const decryptionExampleMapping: { [letter: string]: string } = {
    z: "A",
    m: "D",
    t: "H",
    g: "L",
    f: "M",
    x: "N",
    a: "O",
    e: "U",
  }
  setTimeout(function () {
    for (const letterContainer of document.getElementById("cipher-example-text")!.children) {
      letterContainer.classList.remove("encrypt-example-letter");
      if (letterContainer.textContent == letterContainer.textContent!.toLowerCase() && letterContainer.textContent in decryptionExampleMapping) {
        letterContainer.textContent = decryptionExampleMapping[letterContainer.textContent];
      }
    }
  }, 700);
}
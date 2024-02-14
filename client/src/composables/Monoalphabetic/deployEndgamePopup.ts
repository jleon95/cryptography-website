
function resetAnimationsOfElement(element: HTMLElement, classToRemove: string, classToAdd: string) {
  if (element.classList.contains(classToRemove))
    element.classList.remove(classToRemove);
  element.classList.add(classToAdd);
}
function deployEndgameStatCircles() {
  const validationsCircle: HTMLElement = document.getElementById("endgame-validations-circle")!;
  const timeCircle: HTMLElement = document.getElementById("endgame-time-circle")!;
  const hintsCircle: HTMLElement = document.getElementById("endgame-hints-circle")!;

  resetAnimationsOfElement(validationsCircle, "roll-out-validations", "roll-in-validations");
  resetAnimationsOfElement(timeCircle, "roll-out-time", "roll-in-time");
  resetAnimationsOfElement(hintsCircle, "roll-out-hints", "roll-in-hints");
}

function deployBlurBackground() {
  const blurBackground: HTMLElement = document.getElementById("endgame-background")!;

  resetAnimationsOfElement(blurBackground, "fade-out-background", "fade-in-background");
}

function deployInfoBars() {
  const infoBarSpaces: HTMLElement = document.getElementById("endgame-horizontal-bar-spaces")!;
  const infoBarPunctuation: HTMLElement = document.getElementById("endgame-horizontal-bar-punctuation")!;

  resetAnimationsOfElement(infoBarSpaces, "roll-out-info-bar", "roll-in-info-bar");
  resetAnimationsOfElement(infoBarPunctuation, "roll-out-info-bar", "roll-in-info-bar");
}

export function deployEndGameScreen() {
  deployBlurBackground();
  deployEndgameStatCircles();
  deployInfoBars();
}

function setClosingAnimationOfElement(element: HTMLElement, classToRemove: string, classToAdd: string) {
  element.classList.remove(classToRemove);
  element.classList.add(classToAdd);
}

export function removeEndgameScreen() {
  const blurBackground: HTMLElement = document.getElementById("endgame-background")!;
  const validationsCircle: HTMLElement = document.getElementById("endgame-validations-circle")!;
  const timeCircle: HTMLElement = document.getElementById("endgame-time-circle")!;
  const hintsCircle: HTMLElement = document.getElementById("endgame-hints-circle")!;
  const infoBarSpaces: HTMLElement = document.getElementById("endgame-horizontal-bar-spaces")!;
  const infoBarPunctuation: HTMLElement = document.getElementById("endgame-horizontal-bar-punctuation")!;

  blurBackground.style.setProperty("opacity", window.getComputedStyle(blurBackground).getPropertyValue("opacity"));
  setClosingAnimationOfElement(blurBackground, "fade-in-background", "fade-out-background");
  setClosingAnimationOfElement(validationsCircle, "roll-in-validations", "roll-out-validations");
  setClosingAnimationOfElement(timeCircle, "roll-in-time", "roll-out-time");
  setClosingAnimationOfElement(hintsCircle, "roll-in-hints", "roll-out-hints");
  setClosingAnimationOfElement(infoBarSpaces, "roll-in-info-bar", "roll-out-info-bar");
  setClosingAnimationOfElement(infoBarPunctuation, "roll-in-info-bar", "roll-out-info-bar");

  setTimeout(function () { // Reset state once they're out of sight.
    blurBackground.classList.remove("fade-out-background");
    blurBackground.style.removeProperty("display");
    blurBackground.style.removeProperty("opacity");
    validationsCircle.classList.remove("roll-out-validations");
    timeCircle.classList.remove("roll-out-time");
    hintsCircle.classList.remove("roll-out-hints");
    infoBarSpaces.classList.remove("roll-out-info-bar");
    infoBarPunctuation.classList.remove("roll-out-info-bar");
  }, 1000);
}


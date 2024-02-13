
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

export function removeEndgameScreen() {
  const blurBackground: HTMLElement = document.getElementById("endgame-background")!;
  const validationsCircle: HTMLElement = document.getElementById("endgame-validations-circle")!;
  const timeCircle: HTMLElement = document.getElementById("endgame-time-circle")!;
  const hintsCircle: HTMLElement = document.getElementById("endgame-hints-circle")!;
  const infoBarSpaces: HTMLElement = document.getElementById("endgame-horizontal-bar-spaces")!;
  const infoBarPunctuation: HTMLElement = document.getElementById("endgame-horizontal-bar-punctuation")!;
  blurBackground.style.setProperty("opacity", window.getComputedStyle(blurBackground).getPropertyValue("opacity"));
  blurBackground.classList.remove("fade-in-background");
  blurBackground.classList.add("fade-out-background");
  validationsCircle.classList.remove("roll-in-validations");
  validationsCircle.classList.add("roll-out-validations");
  timeCircle.classList.remove("roll-in-time");
  timeCircle.classList.add("roll-out-time");
  hintsCircle.classList.remove("roll-in-hints");
  hintsCircle.classList.add("roll-out-hints");
  infoBarSpaces.classList.remove("roll-in-info-bar");
  infoBarSpaces.classList.add("roll-out-info-bar");
  infoBarPunctuation.classList.remove("roll-in-info-bar");
  infoBarPunctuation.classList.add("roll-out-info-bar");
  setTimeout(function () {
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


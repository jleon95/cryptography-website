import { resetAnimationsOfElement } from '../utils';

export function goRight(e: Event) {
  const aboutMono: HTMLElement = document.getElementById("about-mono")!;
  const aboutMonoGoLeft: HTMLElement = document.getElementById("about-mono-go-left")!;
  aboutMono.style.setProperty("left", window.getComputedStyle(aboutMono).getPropertyValue("left"));
  resetAnimationsOfElement(aboutMono, "go-left-about-mono-container", "go-right-about-mono-container");
  aboutMonoGoLeft.classList.remove("disabled");
  (e.currentTarget as HTMLElement).classList.add("disabled");
}

export function goLeft(e: Event) {
  const aboutMono: HTMLElement = document.getElementById("about-mono")!;
  const aboutMonoGoRight: HTMLElement = document.getElementById("about-mono-go-right")!;
  aboutMono.style.setProperty("left", window.getComputedStyle(aboutMono).getPropertyValue("left"));
  resetAnimationsOfElement(aboutMono, "go-right-about-mono-container", "go-left-about-mono-container");
  aboutMonoGoRight.classList.remove("disabled");
  (e.currentTarget as HTMLElement).classList.add("disabled");
}
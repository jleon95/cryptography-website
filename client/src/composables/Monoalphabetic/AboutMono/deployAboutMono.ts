import { resetAnimationsOfElement } from '../utils';

export function deployAboutMono() {
  const aboutMono: HTMLElement = document.getElementById("about-mono")!;
  const aboutMonoClose: HTMLElement = document.getElementById("about-mono-close")!;
  const aboutMonoGoLeft: HTMLElement = document.getElementById("about-mono-go-left")!;
  const aboutMonoGoRight: HTMLElement = document.getElementById("about-mono-go-right")!;
  aboutMono.style.setProperty("opacity", "1");
  resetAnimationsOfElement(aboutMono, "deflate-about-mono-container", "inflate-about-mono-container");
  resetAnimationsOfElement(aboutMonoClose, "deflate", "inflate");
  resetAnimationsOfElement(aboutMonoGoLeft, "deflate", "inflate");
  resetAnimationsOfElement(aboutMonoGoRight, "deflate", "inflate");
  setTimeout(() => {
    aboutMono.style.setProperty("opacity", window.getComputedStyle(aboutMono).getPropertyValue("opacity"));
    aboutMonoClose.style.setProperty("opacity", window.getComputedStyle(aboutMonoClose).getPropertyValue("opacity"));
    aboutMonoGoLeft.style.setProperty("opacity", window.getComputedStyle(aboutMonoGoLeft).getPropertyValue("opacity"));
    aboutMonoGoRight.style.setProperty("opacity", window.getComputedStyle(aboutMonoGoRight).getPropertyValue("opacity"));
    aboutMono.style.setProperty("display", window.getComputedStyle(aboutMono).getPropertyValue("display"));
    aboutMonoClose.style.setProperty("display", window.getComputedStyle(aboutMono).getPropertyValue("display"));
    aboutMonoGoLeft.style.setProperty("display", window.getComputedStyle(aboutMono).getPropertyValue("display"));
    aboutMonoGoRight.style.setProperty("display", window.getComputedStyle(aboutMono).getPropertyValue("display"));
    resetAnimationsOfElement(aboutMono, "inflate-about-mono-container");
    resetAnimationsOfElement(aboutMonoClose, "inflate");
    resetAnimationsOfElement(aboutMonoGoLeft, "inflate");
    resetAnimationsOfElement(aboutMonoGoRight, "inflate");
  }, 700);
}
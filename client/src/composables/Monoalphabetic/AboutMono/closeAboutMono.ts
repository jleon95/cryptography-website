import { resetEncryptionBackgroundMovementAnimation, resetEncryptionTextAnimation } from './encryptionExample';

export function closeAboutMono() {
  resetAndCloseAboutMonoContainer();
  fadeOutButtons();
  resetEncryptionBackgroundMovementAnimation();
  resetEncryptionTextAnimation();
}

function resetAndCloseAboutMonoContainer() {

  const aboutMono: HTMLElement = document.getElementById("about-mono")!;
  aboutMono.style.setProperty("opacity", window.getComputedStyle(aboutMono).getPropertyValue("opacity"));
  aboutMono.style.setProperty("left", window.getComputedStyle(aboutMono).getPropertyValue("left"));
  aboutMono.classList.remove("go-left-about-mono-container");
  aboutMono.classList.remove("go-right-about-mono-container");
  aboutMono.classList.add("deflate-about-mono-container");
  setTimeout(function () {
    aboutMono.classList.remove("deflate-about-mono-container");
    aboutMono.style.removeProperty("display");
    aboutMono.style.removeProperty("opacity");
    aboutMono.style.removeProperty("left");
  }, 700);
}

function fadeOutButtons() {
  const aboutMonoClose: HTMLElement = document.getElementById("about-mono-close")!;
  const aboutMonoGoLeft: HTMLElement = document.getElementById("about-mono-go-left")!;
  const aboutMonoGoRight: HTMLElement = document.getElementById("about-mono-go-right")!;
  aboutMonoClose.style.setProperty("opacity", window.getComputedStyle(aboutMonoClose).getPropertyValue("opacity"));
  aboutMonoClose.classList.add("deflate");
  aboutMonoGoLeft.style.setProperty("opacity", window.getComputedStyle(aboutMonoGoLeft).getPropertyValue("opacity"));
  aboutMonoGoLeft.classList.add("deflate");
  aboutMonoGoRight.style.setProperty("opacity", window.getComputedStyle(aboutMonoGoRight).getPropertyValue("opacity"));
  aboutMonoGoRight.classList.add("deflate");
  setTimeout(() => {
    aboutMonoClose.style.removeProperty("display");
    aboutMonoClose.style.removeProperty("opacity");
    aboutMonoClose.classList.remove("deflate");
    aboutMonoGoLeft.style.removeProperty("display");
    aboutMonoGoLeft.style.removeProperty("opacity");
    aboutMonoGoLeft.classList.remove("deflate");
    aboutMonoGoLeft.classList.add("disabled");
    aboutMonoGoRight.style.removeProperty("display");
    aboutMonoGoRight.style.removeProperty("opacity");
    aboutMonoGoRight.classList.remove("deflate");
    aboutMonoGoRight.classList.remove("disabled");
  }, 700);
}
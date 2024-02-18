export function resetAnimationsOfElement(element: HTMLElement, classToRemove: string, classToAdd?: string) {
  if (element.classList.contains(classToRemove))
    element.classList.remove(classToRemove);
  if (typeof classToAdd !== "undefined")
    element.classList.add(classToAdd!);
}
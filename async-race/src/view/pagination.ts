import generateElement from "../utils/generateElement";
import { carObj } from "../utils/types";

export function generatePaginationButtons(): HTMLElement {
  const paginationBlock = generateElement({ tag: "div" });
  const prevButton = generateElement({
    tag: "button",
    class: ["page-button", "prev-btn"],
    textContent: "prev",
  });
  prevButton.setAttribute("disabled", "true");
  const nextButton = generateElement({
    tag: "button",
    class: ["page-button", "next-btn"],
    textContent: "next",
  });
  paginationBlock.append(prevButton, nextButton);
  return paginationBlock;
}

export function generatePages(data: carObj[], itemsPerPage: number, startPage: number): number[] {
  const pagesCount = data.length === 0 ? 1 : Math.ceil(data.length / itemsPerPage);
  const pages = [startPage, pagesCount];
  return pages;
}

export function changePage(
  buttons: HTMLElement,
  pages: number[],
  itemsPerPage: number,
  callback: Function,
  event?: Event,
  direction?: string,
): void {
  const dir = direction ? direction : (event?.target as Element).textContent;
  if (dir === "next") {
    const startIndex = pages[0] * itemsPerPage;
    callback(startIndex);
    buttons.firstElementChild?.removeAttribute("disabled");
    pages[0] += 1;

    if (pages[0] === pages[1]) {
      buttons.lastElementChild?.setAttribute("disabled", "true");
    }
  } else if (dir === "prev") {
    pages[0] -= 1;
    const startIndex = (pages[0] - 1) * itemsPerPage;
    callback(startIndex);
    buttons.lastElementChild?.removeAttribute("disabled");

    if (pages[0] === 1) {
      buttons.firstElementChild?.setAttribute("disabled", "true");
    }
  }
}

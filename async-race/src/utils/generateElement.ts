import { markUp } from "./types";

export default function generateElement(params: markUp): HTMLElement {
  const element = document.createElement(params.tag);

  if (params.class) element.classList.add(...params.class);
  if (params.id) element.id = params.id;
  if (params.textContent) element.textContent = params.textContent;
  if (params.type && element instanceof HTMLInputElement) element.type = params.type;
  if (params.children) {
    params.children.forEach((elem) => {element.append(generateElement(elem))})}
  return element;
}

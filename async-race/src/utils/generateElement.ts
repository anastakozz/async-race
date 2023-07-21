import { markUp } from "./types";

export default function generateElement(params: markUp): HTMLElement {
  const element = document.createElement(params.tag);

  if (params.class) element.classList.add(...params.class);
  if (params.id) element.id = params.id;
  if (params.type ) element.setAttribute("type", params.type);
  if (params.color) element.style.color = params.color;
  if (params.setData ) element.setAttribute("data", params.setData);
  if (params.textContent) element.textContent = params.textContent;
  if (params.children) {
    params.children.forEach((elem) => {element.append(generateElement(elem))})}
  return element;
}

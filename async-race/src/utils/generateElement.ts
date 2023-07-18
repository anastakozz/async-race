export default function generateElement(params: {
  tag: string;
  class?: string[];
  id?: string;
  textContent?: string;
}): HTMLElement {
  const element = document.createElement(params.tag);

  if (params.class) element.classList.add(...params.class);
  if (params.id) element.id = params.id;
  if (params.textContent) element.textContent = params.textContent;
  return element;
}

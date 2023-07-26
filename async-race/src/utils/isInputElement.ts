export default function isInputElement(elem: Element | undefined): elem is HTMLInputElement {
  return !!(elem && elem instanceof HTMLInputElement);
}

import generateElement from "../utils/generateElement";

export default class HeaderView {
  header: HTMLElement;
  toGarage: HTMLElement;
  toWinners: HTMLElement;

  constructor() {
    this.toGarage = generateElement({
      tag: "button",
      class: ["header-button"],
      textContent: "to Garage",
    });
    this.toWinners = generateElement({
      tag: "button",
      class: ["header-button"],
      textContent: "to Winners",
    });
    this.header = this.createHeaderView();
  }

  createHeaderView(): HTMLElement {
    const elem = generateElement({ tag: "header" });
    elem.append(this.toGarage);
    elem.append(this.toWinners);
    document.body.append(elem);
    return elem;
  }
}

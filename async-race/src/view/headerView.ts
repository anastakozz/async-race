import generateElement from "../utils/generateElement";

export default class HeaderView {
  header: HTMLElement;
  toGarage: HTMLElement;
  toWinners: HTMLElement;

  constructor() {
    this.toGarage = generateElement({
      tag: "button",
      class: ["header-button", "btn"],
      textContent: "to Garage",
      id: "garageBtn",
    });
    this.toWinners = generateElement({
      tag: "button",
      class: ["header-button", "btn"],
      textContent: "to Winners",
      id: "winnersBtn",
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

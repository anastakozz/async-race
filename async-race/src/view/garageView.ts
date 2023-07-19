import generateElement from "../utils/generateElement";

export default class GarageView {
  garageBlock: HTMLElement;

  constructor() {
    this.garageBlock = generateElement({
      tag: "div",
      class: ["garage-block"],
      textContent: "garage",
    });
    document.body.append(this.garageBlock);
  }

  public openGarage = () => {
    document.querySelector(".winners-block")?.classList.add("hidden");
    this.garageBlock.classList.remove("hidden");
  };
}

import generateElement from "../utils/generateElement";
import CarsGeneratorView from "./garage_components/carsGeneratorView";
import RaceView from "./garage_components/raceView";

export default class GarageView {
  garageBlock: HTMLElement;
  carsGenerator: CarsGeneratorView;
  raceView: RaceView;

  constructor() {
    this.garageBlock = generateElement({
      tag: "div",
      class: ["garage-block"],
    });
    this.carsGenerator = new CarsGeneratorView();
    this.raceView = new RaceView();
    this.garageBlock.append(
      this.carsGenerator.getBlock(),
      this.raceView.getBlock()
    );
    document.body.append(this.garageBlock);
  }

  public openGarage = (): void => {
    document.querySelector(".winners-block")?.classList.add("hidden");
    this.garageBlock.classList.remove("hidden");
  };
}

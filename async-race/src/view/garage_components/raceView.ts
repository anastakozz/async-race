import generateElement from "../../utils/generateElement";
import { carObj } from "../../utils/types";
import { getGarage } from "../../api/getApi";
import generateTrack from "../garage_components/generateTrack";

export default class RaceView {
  raceBlock: HTMLElement;
  title: HTMLElement;

  constructor() {
    this.raceBlock = generateElement({ tag: "div", class: ["race"] });
    this.title = this.createTitle();
    this.updateTitle();
    this.updateRace();
  }

  private createTitle(): HTMLElement {
    const title = generateElement({ tag: "h2", class: ["garage-title"] });
    this.raceBlock.append(title);
    return title;
  }

  public updateTitle = async () => {
    const data = await getGarage();
    this.title.textContent = `Garage (${data.length})`;
  };

  public updateRace = async () => {
    this.raceBlock.replaceChildren("");
    this.updateTitle();
    this.raceBlock.append(this.title);
    const cars = await getGarage();
    cars.forEach((car) => {
      this.generateCarTrack(car);
    });
  };

  public async generateCarTrack(data: carObj): Promise<void> {
    const track = generateTrack(data);
    this.raceBlock.append(track);
    await this.updateTitle();
  }

  public getBlock(): HTMLElement {
    return this.raceBlock;
  }
}

import { createCar } from "../api/api";
import isInputElement from "../utils/isInputElement";
import RaceView from "../view/garage_components/raceView";

export default async function createGarageCar(raceView: RaceView): Promise<void> {
    const createCarBlock = document.querySelector(".createCar-div");
    const newName = createCarBlock?.children[0];
    const newColor = createCarBlock?.children[1];
    if (isInputElement(newName) && isInputElement(newColor)) {
      if (newName.value === "") {
        alert("Please, enter a car name");
      } else {
        const data = { name: newName.value, color: newColor.value };
        await createCar(data);
        await raceView.generateCarTrack(data);
      }
    }
  }
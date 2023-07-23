import { createCar } from "./setApi";
import RaceView from "../view/garage_components/raceView";
import getRandomNum from "../utils/getRandomNum";
import { getNamesComposition } from "../utils/getNamesComposition";
import { carObj } from "../utils/types";

export default async function generateCar(raceView: RaceView): Promise<void> {
  const carsArr: carObj[] = [];
  const arr = getNamesComposition();

  arr.forEach((item) => {
    const obj: carObj = {};
    obj.name = item;
    obj.color = getRandomColor();
    carsArr.push(obj);
  });

  carsArr.forEach(async (car) => await createCar(car));
  await raceView.updateRace();
}

const getRandomColor = (): string => {
  const colors: number[] = new Array(3);
  colors.fill(0);
  const result = colors.map(() => getRandomNum(0, 255));
  return `rgb(${result})`;
};

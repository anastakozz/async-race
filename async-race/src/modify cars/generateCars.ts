// import { createCar } from "./setApi";
import RaceView from '../view/garage_components/raceView';
import getRandomNum from '../utils/getRandomNum';
import getNamesComposition from '../utils/getNamesComposition';
import { CarObj } from '../utils/types';
import ApiSetManager from '../api/ApiSetManager';

const manager = new ApiSetManager().getManager();

const getRandomColor = (): string => {
  const colors: number[] = new Array(3);
  colors.fill(0);
  const result = colors.map(() => getRandomNum(0, 255).toString(16)).join('');
  return `#${result}`;
};

export default async function generateCars(raceView: RaceView): Promise<void> {
  const carsArr: Partial<CarObj>[] = [];
  const arr = getNamesComposition();

  arr.forEach((item) => {
    const obj: Partial<CarObj> = {};
    obj.name = item;
    obj.color = getRandomColor();
    carsArr.push(obj);
  });

  carsArr.forEach(async (car) => manager.createCar(car));
  await raceView.updateTitles();
  await raceView.updateRace((raceView.pages[0] - 1) * raceView.itemsPerPage);
}

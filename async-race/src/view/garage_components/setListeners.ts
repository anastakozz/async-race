import RaceView from './raceView';
import createGarageCar from '../../modify cars/createGarageCar';
import generateCars from '../../modify cars/generateCars';
import { startRace, resetRace } from '../../race/manageRace';

export default function setListeners(raceView: RaceView): void {
  const createCarButton = document.querySelector('.create-btn');
  createCarButton?.addEventListener('click', () => {
    createGarageCar(raceView);
  });

  const raceButton = document.querySelector('.race-btn');
  raceButton?.addEventListener('click', () => {
    startRace();
  });

  const resetButton = document.querySelector('.reset-btn');
  resetButton?.addEventListener('click', () => {
    resetRace();
  });

  const generateButton = document.querySelector('.gen-btn');
  generateButton?.addEventListener('click', async () => {
    await generateCars(raceView);
  });
}

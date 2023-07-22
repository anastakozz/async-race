import RaceView from "./raceView";
import createGarageCar from "../../api/createGarageCar";
import updateGarageCar from "../../api/updateGarageCar";
import generateCars from '../../api/generateCars';

export default function setListeners(raceView: RaceView): void {
  const createCarButton = document.querySelector(".create-btn");
  createCarButton?.addEventListener("click", () => {
    createGarageCar(raceView);
  });

  const updateCarButton = document.querySelector(".update-btn");
  updateCarButton?.addEventListener("click", () => {
    updateGarageCar(raceView);
  });

  const raceButton = document.querySelector(".race-btn");
  raceButton?.addEventListener("click", () => {
    console.log("START RACE");
  });

  const resetButton = document.querySelector(".reset-btn");
  resetButton?.addEventListener("click", () => {
    raceView.updateRace();
    console.log("RESET");
  });

  const generateButton = document.querySelector(".gen-btn");
  generateButton?.addEventListener("click", () => {
    console.log("Generate 100 cars");
    generateCars(raceView);
  });
}

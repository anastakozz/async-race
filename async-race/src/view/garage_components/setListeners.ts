import RaceView from "./raceView";
import createGarageCar from "../../api/createGarageCar";
import generateCars from "../../api/generateCars";
import { startRace, resetRace } from "../../api/manageRace";

export default function setListeners(raceView: RaceView): void {
  const createCarButton = document.querySelector(".create-btn");
  createCarButton?.addEventListener("click", () => {
    createGarageCar(raceView);
  });

  const raceButton = document.querySelector(".race-btn");
  raceButton?.addEventListener("click", () => {
    startRace();
  });

  const resetButton = document.querySelector(".reset-btn");
  resetButton?.addEventListener("click", () => {
    resetRace();
  });

  const generateButton = document.querySelector(".gen-btn");
  generateButton?.addEventListener("click", async () => {
    await generateCars(raceView);
  });
}

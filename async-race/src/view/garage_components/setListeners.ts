import RaceView from "./raceView";
import createGarageCar from "../../api/createGarageCar";
import generateCars from "../../api/generateCars";

export default function setListeners(raceView: RaceView): void {
  const createCarButton = document.querySelector(".create-btn");
  createCarButton?.addEventListener("click", () => {
    createGarageCar(raceView);
  });

  const raceButton = document.querySelector(".race-btn");
  raceButton?.addEventListener("click", () => {
    console.log("START RACE");
  });

  const resetButton = document.querySelector(".reset-btn");
  resetButton?.addEventListener("click", () => {
    console.log("RESET");
  });

  const generateButton = document.querySelector(".gen-btn");
  generateButton?.addEventListener("click", async () => {
    await generateCars(raceView);
  });
}


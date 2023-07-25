import deleteGarageCar from "../../modify cars/deleteGarageCar";
import activateUpdateCar from "../../modify cars/updateGarageCar";
import { getTrack } from "../../race/startCar";
import stopCar from "../../race/stopCar";

export default async function setRaceViewListener(
  track: HTMLElement
): Promise<void> {
  const deleteButton = track.querySelector(".remove-btn");
  const selectButton = track.querySelector(".select-btn");
  const startButton = track.querySelector(".button-a");
  const stopButton = track.querySelector(".button-b");

  stopButton?.setAttribute("disabled", "true");

  deleteButton?.addEventListener("click", async (event) => {
    await deleteGarageCar(event);
  });

  selectButton?.addEventListener("click", async (event) => {
    await activateUpdateCar(event);
  });

  startButton?.addEventListener("click", async (event) => {
    await getTrack(event);
  });

  stopButton?.addEventListener("click", async (event) => {
    await stopCar(event);
  });
}

import deleteGarageCar from "../../api/deleteGarageCar";
import activateUpdateCar from "../../api/updateGarageCar";

export default async function setRaceViewListener(
  track: HTMLElement
): Promise<void> {
  const deleteButton = track.querySelector(".remove-btn");
  const selectButton = track.querySelector(".select-btn");

  deleteButton?.addEventListener("click", async (event) => {
    await deleteGarageCar(event);
  });

  selectButton?.addEventListener("click", async (event) => {
    await activateUpdateCar(event);
  });
}

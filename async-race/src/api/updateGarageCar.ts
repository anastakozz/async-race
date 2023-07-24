import isInputElement from "../utils/isInputElement";
import { getCar } from "./getApi";
import ApiSetManager from "./ApiSetManager";
const manager = new ApiSetManager().getManager();

export default async function activateUpdateCar(event: Event) {
  const updateGarageCar = async (): Promise<void> => {
    if (isInputElement(newName) && isInputElement(newColor) && id) {
      const data = { id: +id, name: newName.value, color: newColor.value };
      await manager.updateCar(data);

      const car = track.querySelector(".car");
      if (car instanceof HTMLElement) car.style.color = newColor.value;
      const carName = track.querySelector(".car-name");
      if (carName instanceof HTMLElement) carName.textContent = newName.value;

      newName.value = "";
      newColor.value = "#000000";
    }

    updateCarButton?.removeEventListener("click", updateGarageCar);
  };

  const target = event.target as HTMLElement;
  const track = target.parentElement?.parentElement;
  const id = track?.id;

  const oldData = id ? await getCar(+id) : null;

  const updateCarBlock = document.querySelector(".updateCar-div");
  const newName = updateCarBlock?.children[0];
  const newColor = updateCarBlock?.children[1];

  if (isInputElement(newName) && isInputElement(newColor)) {
    if (oldData?.name) newName.value = oldData.name;
    if (oldData?.color) newColor.value = oldData.color;
  }

  const updateCarButton = document.querySelector(".update-btn");
  updateCarButton?.addEventListener("click", updateGarageCar);
}

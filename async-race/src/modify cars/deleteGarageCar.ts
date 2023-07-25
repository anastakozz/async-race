// import { deleteCarFromGarage, deleteCarFromWinners } from "./setApi";
import { getGarage } from "../api/getApi";
import ApiSetManager from "../api/ApiSetManager";
const manager = new ApiSetManager().getManager();

export default async function deleteGarageCar(event: Event): Promise<void> {
  const title = document.querySelector(".garage-title");
  const elem = event.target;

  if (elem && elem instanceof HTMLElement) {
    const track = elem.parentElement?.parentElement;
    const id = track?.id;
    track?.remove();

    if (id) {
      await manager.deleteCarFromGarage(+id);
      await manager.deleteCarFromWinners(+id);
      const data = await getGarage();
      if (title) title.textContent = `Garage (${data.length})`;
    }
  }
}

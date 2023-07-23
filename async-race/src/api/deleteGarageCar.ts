import { deleteCarFromGarage, deleteCarFromWinners } from "./setApi";
import { getGarage } from "./getApi";

export default async function deleteGarageCar(event: Event): Promise<void> {
  const title = document.querySelector(".garage-title");
  const elem = event.target;

  if (elem && elem instanceof HTMLElement) {
    const track = elem.parentElement?.parentElement;
    const id = track?.id;
    track?.remove();

    if (id) {
      await deleteCarFromGarage(+id);
      await deleteCarFromWinners(+id);
      const data = await getGarage();
      if (title) title.textContent = `Garage (${data.length})`;
    }
  }
}

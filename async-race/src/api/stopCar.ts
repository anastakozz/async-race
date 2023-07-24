import { switchEngine } from "./raceApi";

export default async function stopCar(event: Event): Promise<void> {
  const elem = event.target;

  if (elem && elem instanceof HTMLElement) {
    elem.setAttribute("disabled", "true");
    elem.previousElementSibling?.removeAttribute("disabled");
    const id = elem.parentElement?.parentElement?.parentElement?.id;
    console.log(`car ${id} stopped`);

    if (id) {
      const params = await switchEngine(+id, "stopped");
      console.log('bringCarBack()', id);
      // bringCarBack(track);
    }
  }
}

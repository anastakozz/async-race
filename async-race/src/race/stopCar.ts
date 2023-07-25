import { switchEngine } from "../api/raceApi";

export default async function stopCar(event: Event): Promise<void> {
  const elem = event.target;

  if (elem && elem instanceof HTMLElement) {
    elem.setAttribute("disabled", "true");
    const id = elem.parentElement?.parentElement?.parentElement?.id;
    console.log(`car ${id} stopped`);

    if (id) {
      const params = await switchEngine(+id, "stopped");
    //   "stopAnimation()", id
      console.log('bringCarBack():', id);//+enable startcar-button
    }
  }
}



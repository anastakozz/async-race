import { switchEngine, swithToDrive } from "./raceApi";
import { driveParams } from "../utils/types";

export default async function startCar(event: Event): Promise<void> {
  const elem = event.target;

  if (elem && elem instanceof HTMLElement) {
    elem.setAttribute("disabled", "true");
    elem.nextElementSibling?.removeAttribute("disabled");
    const track = elem.parentElement?.parentElement?.parentElement;
    const id = track?.id;
    console.log(`car ${id} started`);
    if (id) {
      const params = await switchEngine(+id, "started");
      driveCar(track, +id, params);
    }
  }
}

const driveCar = async (track: HTMLElement, id: number, params: driveParams) => {
    console.log('startAnimation()', id);
    const result = await swithToDrive(+id);
    if (!result) {
        console.log('stopAnimation()', id);
    }
    
};

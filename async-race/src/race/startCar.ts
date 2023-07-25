import { switchEngine, swithToDrive } from "../api/raceApi";
import { driveParams } from "../utils/types";
import { raceResult } from "../utils/types";

export async function getTrack(event: Event): Promise<void> {
  const elem = event.target;

  if (elem && elem instanceof HTMLElement) {
    elem.setAttribute("disabled", "true");
    elem.nextElementSibling?.removeAttribute("disabled");
    const track = elem.parentElement?.parentElement?.parentElement;
    const id = track?.id;
    if (id) await startCar(+id);
  }
}

export async function startCar(id: number): Promise<raceResult | null> {
  console.log(`car ${id} started`);

  const params = await switchEngine(+id, "started");
  console.log(id, params);
  const result = await driveCar(+id, params);
  return result;
}

const driveCar = async (
  id: number,
  params: driveParams
): Promise<raceResult | null> => {
  const time = params.distance / params.velocity;
  console.log("startAnimation()", id);
  const result = await swithToDrive(+id);
  if (!result) {
    console.log("stopAnimation()", id);
    return null;
  } else {
    const result = { id: id, time: time };
    return result;
  }
};

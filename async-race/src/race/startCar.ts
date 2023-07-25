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
import startAnimation from './animateCar';

export async function startCar(id: number): Promise<raceResult | null> {
  const params = await switchEngine(+id, "started");
  const result = await driveCar(+id, params);
  return result;
}

const driveCar = async (
  id: number,
  params: driveParams
): Promise<raceResult | null> => {
  const time = params.distance / params.velocity / 1000;
  const animation = new startAnimation(id, time);
  const result = await swithToDrive(+id);
  if (!result) {
    window.cancelAnimationFrame(animation.requestID);
    return null;
  } else {
    const result = { id: id, time: time };
    return result;
  }
};

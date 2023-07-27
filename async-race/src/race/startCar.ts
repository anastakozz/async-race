import { switchEngine, swithToDrive } from '../api/raceApi';
import { DriveParams, RaceResult } from '../utils/types';
import StartAnimation from './animateCar';

const driveCar = async (
  id: number,
  params: DriveParams,
): Promise<RaceResult | null> => {
  const time = params.distance / params.velocity / 1000;
  const animation = new StartAnimation(id, time);
  const response = await swithToDrive(+id);
  if (!response) {
    window.cancelAnimationFrame(animation.requestID);
    return null;
  }
  const result = { id, time };
  return result;
};

export async function startCar(id: number): Promise<RaceResult | null> {
  const params = await switchEngine(+id, 'started');
  const result = await driveCar(+id, params);
  return result;
}

export async function getTrack(event: Event): Promise<void> {
  const elem = event.target;

  if (elem && elem instanceof HTMLElement) {
    elem.setAttribute('disabled', 'true');
    elem.nextElementSibling?.removeAttribute('disabled');
    const track = elem.parentElement?.parentElement?.parentElement;
    const car = track?.querySelector('.car');
    car?.classList.add('dribble');
    const id = track?.id;
    if (id) await startCar(+id);
  }
}

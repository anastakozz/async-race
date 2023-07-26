import { switchEngine } from '../api/raceApi';

export function bringCarBack(track: HTMLElement) {
  const car = track?.querySelector('.car') as HTMLElement;
  const newCar = car.cloneNode(true) as HTMLElement;
  newCar.style.transform = 'none';
  car.replaceWith(newCar);
}

export async function stopCar(event: Event): Promise<void> {
  const elem = event.target;

  if (elem && elem instanceof HTMLElement) {
    elem.setAttribute('disabled', 'true');
    const track = elem.parentElement?.parentElement?.parentElement;

    const startButton = track?.querySelector('.button-a') as HTMLElement;
    const id = track?.id;

    if (id) {
      const params = await switchEngine(+id, 'stopped');
      if (params) {
        bringCarBack(track);
        startButton.removeAttribute('disabled');
      }
    }
  }
}

import isInputElement from '../utils/isInputElement';
import { getCar } from '../api/getApi';
import ApiSetManager from '../api/ApiSetManager';

const manager = new ApiSetManager().getManager();

export default async function activateUpdateCar(event: Event) {
  const target = event.target as HTMLElement;
  const track = target.parentElement?.parentElement;
  const id = track?.id;

  const oldData = id ? await getCar(+id) : null;

  const updateCarBlock = document.querySelector('.updateCar-div');
  const newName = updateCarBlock?.children[1];
  const newColor = updateCarBlock?.children[2];
  const updateCarButton = document.querySelector('.update-btn');

  const updateGarageCar = async (): Promise<void> => {
    if (isInputElement(newName) && isInputElement(newColor) && id) {
      const data = { id: +id, name: newName.value, color: newColor.value };
      await manager.updateCar(data);
      const car = track.querySelector('.car');
      if (car instanceof HTMLElement) car.style.color = newColor.value;
      const carName = track.querySelector('.car-name');
      if (carName instanceof HTMLElement) carName.textContent = newName.value;
    }

    updateCarButton?.removeEventListener(
      'click',
      updateGarageCar,
    );
  };

  if (isInputElement(newName) && isInputElement(newColor)) {
    if (oldData?.name) newName.value = oldData.name;
    if (oldData?.color) newColor.value = oldData.color;
  }

  updateCarButton?.addEventListener('click', updateGarageCar);
}

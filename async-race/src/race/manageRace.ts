import controlButtonsRace from '../utils/controlButtons';
import { RaceResult } from '../utils/types';
import { startCar } from './startCar';
import { getCar, getWinner } from '../api/getApi';
import { bringCarBack } from './stopCar';
import ApiSetManager from '../api/ApiSetManager';
import generateElement from '../utils/generateElement';

const manager = new ApiSetManager().getManager();

async function checkWinner(winner: RaceResult): Promise<void> {
  const newObj = await getWinner(winner.id);
  if (!newObj.wins) {
    newObj.id = winner.id;
    newObj.time = winner.time;
    newObj.wins = 1;
    await manager.createWinner(newObj);
  } else {
    newObj.wins += 1;
    if (newObj.time) {
      newObj.time = winner.time > newObj.time ? winner.time : newObj.time;
    }
    await manager.updateWinner(newObj);
  }
}

async function findWinner(
  successArr: RaceResult[],
  stoppedArr: number[],
): Promise<void> {
  const arr = successArr.filter((res) => !stoppedArr.includes(res.id));
  const winner = arr.sort((a, b) => a.time - b.time)[0];
  winner.time = Math.ceil(winner.time);
  const winnerCar = await getCar(winner.id);
  const popup = generateElement({
    tag: 'div',
    class: ['popup'],
    textContent: `${winnerCar.name} showed the best time: ${winner.time}sec!`,
  });
  document.querySelector('.garage-block')?.append(popup);
  controlButtonsRace('enable');
  return checkWinner(winner);
}

export async function startRace() {
  document.querySelector('.popup')?.remove();
  const stoppedArr: number[] = [];

  controlButtonsRace('disable', stoppedArr);

  const tracks = Array.from(document.querySelectorAll('.race-track'));
  const resultsArr: RaceResult[] = [];

  Promise.allSettled(
    tracks.map(async (track) => {
      if (track) {
        const res = await startCar(+track.id);
        if (res) resultsArr.push(res);
      }
    }),
  ).then(async () => {
    await findWinner(resultsArr, stoppedArr);
  });
}

export async function resetRace() {
  const tracks = Array.from(document.querySelectorAll('.race-track'));
  document.querySelector('.popup')?.remove();
  tracks.forEach((track) => {
    if (track instanceof HTMLElement) bringCarBack(track);
  });
}

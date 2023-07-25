import controlButtonsRace from "../utils/controlButtons";
import { carObj, raceResult } from "../utils/types";
import { startCar } from "./startCar";
import { getCar, getWinner } from "../api/getApi";
import ApiSetManager from "../api/ApiSetManager";
const manager = new ApiSetManager().getManager();

export async function startRace() {
  console.log("start race");
  const stoppedArr: number[] = [];

  controlButtonsRace("disable", stoppedArr);

  const tracks = Array.from(document.querySelectorAll(".race-track"));
  console.log(tracks);
  const resultsArr: raceResult[] = [];

  Promise.allSettled(
    tracks.map(async (track) => {
      const res = await startCar(+track?.id);
      if (res) resultsArr.push(res);
    })
  ).then(async () => {
    await findWinner(resultsArr, stoppedArr);
  });
}

export async function resetRace() {
  console.log("reset race");
}

async function findWinner(
  successArr: raceResult[],
  stoppedArr: number[]
): Promise<void> {
  const arr = successArr.filter((res) => !stoppedArr.includes(res.id));
  const winner = arr.sort((a, b) => a.time - b.time)[0];
  winner.time = Math.ceil(winner.time);
  const winnerCar = await getCar(winner.id);
  alert(
    `Aaaaaaand! ${winnerCar.name} showed the best time: ${winner.time}!!! WOW!`
  );
  controlButtonsRace("enable");
  return await checkWinner(winner);
}

async function checkWinner(winner: raceResult): Promise<void> {
  console.log(winner);
  const newObj = await getWinner(winner.id);
  if (!newObj.wins) {
    newObj.id = winner.id;
    newObj.time = winner.time;
    newObj.wins = 1;
    console.log(newObj);
    await manager.createWinner(newObj);
  } else {
    newObj.wins += 1;
    if (newObj.time) {
      newObj.time = winner.time > newObj.time ? winner.time : newObj.time;
    }
    await manager.updateWinner(newObj);
  }
}
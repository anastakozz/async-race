import { enableButtonsForRace } from "../utils/controlButtons";
import { raceResult } from "../utils/types";
import { startCar } from "./startCar";
import { getCar } from "./getApi";

export async function startRace() {
  console.log("start race");
  const buttonsAll = document.querySelectorAll(".btn");
  const stoppedArr: number[] = [];

  buttonsAll.forEach((button) => {
    button.setAttribute("disabled", "true");
  });
  enableButtonsForRace(stoppedArr);

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
): Promise<raceResult> {
  const arr = successArr.filter((res) => !stoppedArr.includes(res.id));
  const winner = arr.sort((a, b) => a.time - b.time)[0];
  console.log(winner);
  const fullWinner = await getCar(winner.id);
  alert(
    `Aaaaaaand! ${fullWinner.name} showed the best time: ${Math.round(
      winner.time
    )}!!! WOW!`
  );

  return winner;
}

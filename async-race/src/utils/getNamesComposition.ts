import { carNames, carSurnames } from "../utils/carNames";

export function getNamesComposition(): string[] {
  const result: string[] = [];

  for (let i = 0; i < 10; i++) {
    const arr = randomizeNames();
    result.splice(result.length, 0, ...arr);
  }
  return result.slice(0, 100);
}

const randomizeNames = (): string[] => {
  const randomN = carNames.map(Math.random);
  carNames.sort(
    (a, b) => randomN[carNames.indexOf(a)] - randomN[carNames.indexOf(b)]
  );
  const randomS = carNames.map(Math.random);
  carSurnames.sort(
    (a, b) => randomS[carSurnames.indexOf(a)] - randomS[carSurnames.indexOf(b)]
  );
  const arr = carNames.map((item, ind) => item + " " + carSurnames[ind]);
  return arr;
};

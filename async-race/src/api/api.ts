import { winnerObj } from "../utils/types";
const baseURl = "http://127.0.0.1:3000";

export async function getWinners(): Promise<winnerObj[]> {
  const response = await fetch(`${baseURl}/winners`);
  const data: winnerObj[] = await response.json();
  const dataModified = data.map(async (winner): Promise<winnerObj> => {
    const car = await getCar(winner.id);
    winner.name = car.name;
    winner.color = car.color;
    return winner;
  });
  return await Promise.all(dataModified);
}

export async function getCar(id: number): Promise<winnerObj> {
  const response = await fetch(`${baseURl}/garage/${id}`);
  const data: winnerObj = await response.json();
  return data;
}

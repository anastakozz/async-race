import { carObj } from "../utils/types";
const baseURl = "http://127.0.0.1:3000";

export async function getWinners(): Promise<carObj[]> {
  const response = await fetch(`${baseURl}/winners`);
  const data: carObj[] = await response.json();
  const dataModified = data.map(async (winner): Promise<carObj> => {
    const car = await getCar(winner.id);
    winner.name = car.name;
    winner.color = car.color;
    return winner;
  });
  return await Promise.all(dataModified);
}

export async function getWinner(
  id: number | undefined
): Promise<carObj> {
    const response = await fetch(`${baseURl}/winners/${id}`);
    const data: carObj = await response.json();
    return data;
}

export async function getCar(id: number | undefined): Promise<carObj> {
  const response = await fetch(`${baseURl}/garage/${id}`);
  const data: carObj = await response.json();
  return data;
}

export async function getGarage(): Promise<carObj[]> {
  const response = await fetch(`${baseURl}/garage`);
  const data = await response.json();
  return data;
}

import { CarObj } from '../utils/types';

const baseURl = 'http://127.0.0.1:3000';

export async function getWinner(
  id: number | undefined,
): Promise<CarObj> {
  const response = await fetch(`${baseURl}/winners/${id}`);
  const data: CarObj = await response.json();
  return data;
}

export async function getCar(id: number | undefined): Promise<CarObj> {
  const response = await fetch(`${baseURl}/garage/${id}`);
  const data: CarObj = await response.json();
  return data;
}

export async function getGarage(): Promise<CarObj[]> {
  const response = await fetch(`${baseURl}/garage`);
  const data = await response.json();
  return data;
}

export async function getWinners(): Promise<CarObj[]> {
  const response = await fetch(`${baseURl}/winners`);
  const data: CarObj[] = await response.json();
  const dataModified = data.map(async (winner): Promise<CarObj> => {
    const car = await getCar(winner.id);
    winner.name = car.name;
    winner.color = car.color;
    return winner;
  });
  return Promise.all(dataModified);
}

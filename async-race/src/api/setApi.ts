import { carObj } from "../utils/types";
const baseURl = "http://127.0.0.1:3000";

export async function createCar(params: carObj): Promise<void> {
  await fetch(`${baseURl}/garage`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
  });
}

export async function updateCar(params: carObj): Promise<void> {
  await fetch(`${baseURl}/garage/${params.id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
  });
}

export async function deleteCarFromGarage(param: number): Promise<void> {
  await fetch(`${baseURl}/garage/${param}`, {
    method: "DELETE",
  });
}

export async function deleteCarFromWinners(param: number): Promise<void> {
  await fetch(`${baseURl}/winners/${param}`, {
    method: "DELETE",
  });
}

import { carObj } from "../utils/types";
const baseURl = "http://127.0.0.1:3000";

export async function createCar(params: carObj): Promise<void> {
  await fetch(`${baseURl}/garage`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
  });
}

import deleteGarageCar from "../../api/deleteGarageCar";

export default async function setRaceViewListener(track: HTMLElement): Promise<void> {
  const deleteButton = track.querySelector(".remove-btn");

  deleteButton?.addEventListener("click", async (event) => {
    await deleteGarageCar(event);
  });
}

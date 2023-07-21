import generateElement from "../../utils/generateElement";
import { carObj } from "../../utils/types";

export default function generateCarTrack(data: carObj): HTMLElement {
  const track = generateElement({
    tag: "div",
    class: ["race-track"],
  });
  const upperRow = generateElement({
    tag: "div",
    class: ["track-upper-row"],
    children: [
      { tag: "button", class: ["select-btn"], textContent: "Select" },
      { tag: "button", class: ["remove-btn"], textContent: "Remove" },
      { tag: "span", class: ["car-name"], textContent: `${data.name}` },
    ],
  });

  const lowerRow = generateElement({
    tag: "div",
    class: ["track-lower-row"],
    children: [
      {
        tag: "div",
        class: ["buttons-div"],
        children: [
          { tag: "button", class: ["button-a"], textContent: "A" },
          { tag: "button", class: ["button-b"], textContent: "B" },
        ],
      },
    ],
  });

  track.append(upperRow, lowerRow);

  return track;
}

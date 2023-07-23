import generateElement from "../../utils/generateElement";
import { carObj } from "../../utils/types";
import { inlineSnail } from "./snail";

export default function generateTrack(data: carObj): HTMLElement {
  const track = generateElement({
    tag: "div",
    class: ["race-track"],
  });
  track.id = `${data.id}`;
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
      {
        tag: "div",
        class: ["car-div"],
        children: [{ tag: "div", class: ["car"], color: data.color }],
      },
      { tag: "span", class: ["flag-img"] },
    ],
  });

  const carSvg = lowerRow.querySelector(".car");
  if (carSvg) carSvg.innerHTML = inlineSnail;

  track.append(upperRow, lowerRow);
  return track;
}

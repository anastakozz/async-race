export const enableButtonsForRace = (store: number[]) => {
  const resetBtn = document.querySelector(".reset-btn");
  resetBtn?.removeAttribute("disabled");

  const stopButtons = document.querySelectorAll(".button-b");
  const buttonsToEnable = Array.from(stopButtons);
  if (resetBtn) buttonsToEnable.push(resetBtn);



  buttonsToEnable.forEach((button) => {
    button.removeAttribute("disabled");
    button.addEventListener("click", (event) => {
      countStop(event);
    });
  });

  function countStop(event: Event) {
    const elem = event.target;
    if (elem && elem instanceof HTMLElement) {
      const track = elem.parentElement?.parentElement?.parentElement;
      const id = track?.id;
      if(id) store.push(+id);
    }
  }
};



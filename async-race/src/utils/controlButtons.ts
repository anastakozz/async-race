export default function controlButtonsRace(action: string, store?: number[]) {
  const buttonsAll = document.querySelectorAll('.btn');
  const stopButtons = document.querySelectorAll('.button-b');
  const startButtons = document.querySelectorAll('.button-a');
  const pageButtons = document.querySelectorAll('.page-button');

  function countStops(event: Event) {
    const elem = event.target;
    if (elem && elem instanceof HTMLElement) {
      const track = elem.parentElement?.parentElement?.parentElement;
      const id = track?.id;
      if (id && store) store.push(+id);
    }
  }

  buttonsAll.forEach((button) => {
    button.toggleAttribute('disabled');
  });
  pageButtons.forEach((button) => button.classList.toggle('hidden'));

  if (action === 'disable') {
    startButtons.forEach((button) => button.setAttribute('disabled', 'true'));
    stopButtons.forEach((button) => {
      button.addEventListener('click', countStops);
      button.removeAttribute('disabled');
    });
  } else if (action === 'enable') {
    startButtons.forEach((button) => button.removeAttribute('disabled'));
    stopButtons.forEach((button) => {
      button.removeEventListener('click', countStops);
      button.setAttribute('disabled', 'true');
    });
  }
}

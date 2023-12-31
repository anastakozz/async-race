import generateElement from '../../utils/generateElement';

export default class CarsGeneratorView {
  generatorBlock: HTMLElement;

  constructor() {
    this.generatorBlock = generateElement({
      tag: 'div',
      class: ['cars-generator'],
    });
    this.generateCarsButtons();
    this.generateRaceButtons();
  }

  private generateCarsButtons(): void {
    const createCarBlock = generateElement({
      tag: 'div',
      class: ['createCar-div'],
      children: [
        { tag: 'span', class: ['span-name'], textContent: 'Create snail:' },
        { tag: 'input', class: ['create-name', 'input'] },
        { tag: 'input', type: 'color', class: ['pick-color', 'input'] },
        { tag: 'button', class: ['create-btn', 'btn'], textContent: 'Create' },
      ],
    });
    const updateCarBlock = generateElement({
      tag: 'div',
      class: ['updateCar-div'],
      children: [
        { tag: 'span', class: ['span-name'], textContent: 'Update snail:' },
        { tag: 'input', class: ['update-name', 'input'] },
        { tag: 'input', type: 'color', class: ['pick-color', 'input'] },
        { tag: 'button', class: ['update-btn', 'btn'], textContent: 'Update' },
      ],
    });
    this.generatorBlock.append(createCarBlock, updateCarBlock);
  }

  private generateRaceButtons(): void {
    const raceButtons = generateElement({
      tag: 'div',
      class: ['race-btns'],
      children: [
        { tag: 'button', textContent: 'RACE', class: ['race-btn', 'btn'] },
        { tag: 'button', textContent: 'RESET', class: ['reset-btn', 'btn'] },
        { tag: 'button', textContent: 'Generate snails', class: ['gen-btn', 'btn'] },
      ],
    });
    this.generatorBlock.append(raceButtons);
  }

  public getBlock(): HTMLElement {
    return this.generatorBlock;
  }
}

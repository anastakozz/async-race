import generateElement from '../../utils/generateElement';
import { CarObj } from '../../utils/types';
import { getGarage } from '../../api/getApi';
import generateTrack from './generateTrack';
import setRaceViewListeners from './setRaceViewListeners';
import {
  generatePaginationButtons,
  generatePages,
  changePage,
} from '../pagination';

export default class RaceView {
  raceBlock: HTMLElement;

  carsBlock: HTMLElement;

  buttons: HTMLElement;

  titles: HTMLElement;

  pages: number[];

  data: CarObj[];

  itemsPerPage = 7;

  constructor() {
    this.pages = [1, 1];
    this.data = [];
    this.raceBlock = generateElement({ tag: 'div', class: ['race'] });
    this.carsBlock = generateElement({ tag: 'div', class: ['cars-block'] });

    this.titles = this.createTitles();
    this.buttons = generatePaginationButtons();
    this.createRace();

    this.buttons.addEventListener('click', (event) => {
      changePage(
        this.buttons,
        this.pages,
        this.itemsPerPage,
        this.updateRace.bind(this),
        event,
      );
      this.updatePageNumTitle();
    });
  }

  private createTitles(): HTMLElement {
    const titleDiv = generateElement({
      tag: 'div',
      class: ['title-div'],
      children: [
        { tag: 'h2', class: ['garage-title'] },
        { tag: 'h2', class: ['pages-num-title'] },
      ],
    });
    this.raceBlock.append(titleDiv);
    return titleDiv;
  }

  public updateTitles = async (): Promise<void> => {
    this.data = await getGarage();
    this.pages = generatePages(this.data, 7, this.pages[0]);

    this.updateGarageLength(this.data.length);
    this.updatePageNumTitle();
  };

  private updateGarageLength = (length: number): void => {
    if (this.titles.firstElementChild instanceof HTMLElement) {
      this.titles.firstElementChild.textContent = `Garage (${length})`;
    }
  };

  private updatePageNumTitle = (): void => {
    if (this.titles.lastElementChild instanceof HTMLElement) {
      this.titles.lastElementChild.textContent = `Page ${this.pages[0]}/${this.pages[1]}`;
    }
  };

  private createRace = async (): Promise<void> => {
    this.raceBlock.append(this.titles, this.carsBlock, this.buttons);
    await this.updateTitles();
    this.updateRace(0);
  };

  public updateRace = async (startIndex: number): Promise<void> => {
    this.carsBlock.replaceChildren('');
    const carsToShow = this.data.slice(startIndex, startIndex + 7);
    carsToShow.forEach((car) => {
      this.generateCarTrack(car);
    });
    if (this.pages[1] === 1) {
      this.buttons.lastElementChild?.setAttribute('disabled', 'true');
    } else {
      this.buttons.lastElementChild?.removeAttribute('disabled');
    }
  };

  public async generateCarTrack(data: CarObj): Promise<void> {
    const track = generateTrack(data);
    setRaceViewListeners(track);
    this.carsBlock.append(track);
  }

  public getBlock(): HTMLElement {
    return this.raceBlock;
  }
}

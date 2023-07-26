import generateElement from '../utils/generateElement';
import CarsGeneratorView from './garage_components/carsGeneratorView';
import RaceView from './garage_components/raceView';
import setListeners from './garage_components/setListeners';

export default class GarageView {
  garageBlock: HTMLElement;

  carsGenerator: CarsGeneratorView;

  raceView: RaceView;

  constructor() {
    this.garageBlock = generateElement({
      tag: 'div',
      class: ['garage-block'],
    });
    this.carsGenerator = new CarsGeneratorView();
    this.raceView = new RaceView();
    this.garageBlock.append(
      this.carsGenerator.getBlock(),
      this.raceView.getBlock(),
    );
    document.body.append(this.garageBlock);
    setListeners(this.raceView);
  }

  public openGarage = (): void => {
    document.querySelector('.winners-block')?.classList.add('hidden');
    this.garageBlock.classList.remove('hidden');
  };
}

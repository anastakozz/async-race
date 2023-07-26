import WinnersView from '../view/winnersView';
import GarageView from '../view/garageView';
import ApiSetManager from '../api/ApiSetManager';

export default class Controller {
  winners: WinnersView | null;

  garage: GarageView | null;

  apiSetManager: ApiSetManager | null;

  constructor() {
    this.winners = null;
    this.garage = null;
    this.apiSetManager = new ApiSetManager();
    this.apiSetManager.subscribe(this);
  }

  public generateStartView(): void {
    this.winners = new WinnersView();
    this.winners.generateWinnersView();
    this.garage = new GarageView();
    this.garage.openGarage();
  }

  public changeView(event: Event): void {
    switch ((event.target as Element).id) {
      case 'garageBtn':
        this.garage?.openGarage();
        break;
      case 'winnersBtn':
        this.winners?.openWinners();
        break;
      default:
        throw new Error('Smth went wrong...');
    }
  }

  public updateWinners() {
    this.winners?.generateWinnersView();
  }
}

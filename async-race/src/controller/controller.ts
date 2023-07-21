import WinnersView from "../view/winnersView";
import GarageView from "../view/garageView";

export default class Controller {
  winners: WinnersView | null;
  garage: GarageView | null;

  constructor() {
    this.winners = null;
    this.garage = null;
  }

  public generateStartView(): void {
    this.winners = new WinnersView();
    this.winners.generateWinnersView();
    this.garage = new GarageView();
    this.garage.openGarage();
  }

  public changeView(event: Event): void {
    switch ((event.target as Element).id) {
      case "garageBtn":
        this.garage?.openGarage();
        break;
      case "winnersBtn":
        this.winners?.openWinners();
        break;
    }
  }
}

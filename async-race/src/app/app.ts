import "../style.css";
import HeaderView from "../view/headerView";
import WinnersView from "../view/winnersView";
import GarageView from "../view/garageView";

export default class App {
  header: HeaderView | null;
  winners: WinnersView | null;
  garage: GarageView | null;

  constructor() {
    this.header = null;
    this.winners = null;
    this.garage = null;
  }

  start(): void {
    this.header = new HeaderView();
    this.winners = new WinnersView();
    this.winners.generateWinnersView();
    this.garage = new GarageView();
    this.garage.openGarage();
    this.header.toGarage.addEventListener("click", this.garage.openGarage);
    this.header.toWinners.addEventListener("click", this.winners.openWinners);
  }
}

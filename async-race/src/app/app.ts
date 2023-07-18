import HeaderView from "../view/headerView";
import winnersView from "../view/winnersView";

export default class App {
  header: HeaderView | null;
  winners: winnersView | null;

  constructor() {
    this.header = null;
    this.winners = null;
  }

  start(): void {
    this.header = new HeaderView();
    this.winners = new winnersView();
    // this.header.toGarage.addEventListener("click", openGarage());
    this.header.toWinners.addEventListener("click", this.winners.generateWinnersView);
  }
}

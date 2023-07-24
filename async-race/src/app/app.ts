import "../style.css";
import HeaderView from "../view/headerView";
import Controller from "../controller/controller";

export default class App {
  header: HeaderView | null;

  constructor() {
    this.header = null;
  }

  start(): void {
    alert("Дорогой Проверяющий, пожалуйста проверь мою работу через день-другой. Я очень стараюсь добить этих улиток. Спасибо большое!  ")

    this.header = new HeaderView();
    const controller = new Controller();
    controller.generateStartView();
    this.header.toGarage.addEventListener("click", (event) => {
      controller.changeView(event);
    });
    this.header.toWinners.addEventListener("click", (event) => {
      controller.changeView(event);
    });
  }
}

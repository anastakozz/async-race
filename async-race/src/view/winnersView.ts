import { carObj } from "../utils/types";
import generateElement from "../utils/generateElement";
import { getWinners } from "../api/getApi";
import {
  generatePaginationButtons,
  generatePages,
  changePage,
} from "./pagination";
import { inlineSnail } from "../view/garage_components/snail";

export default class WinnersView {
  winnersBlock: HTMLElement;
  table: HTMLElement;
  buttons: HTMLElement;
  data: carObj[];
  pages: number[];
  itemsPerPage = 10;

  constructor() {
    this.pages = [1, 1];
    this.data = [];
    this.winnersBlock = generateElement({
      tag: "div",
      class: ["winners-block"],
    });
    this.table = generateElement({ tag: "table", class: ["winners-table"] });
    this.buttons = generatePaginationButtons();
    this.buttons.addEventListener("click", (event) => {
      changePage(
        this.buttons,
        this.pages,
        this.itemsPerPage,
        this.generateTableRows.bind(this),
        event
      );
    });
    this.generateTable();
  }

  public openWinners = () => {
    document.querySelector(".garage-block")?.classList.add("hidden");
    this.winnersBlock.classList.remove("hidden");
  };

  public generateWinnersView = async () => {
    this.winnersBlock.replaceChildren("");

    const fragment = document.createDocumentFragment();
    this.data = await getWinners();

    const title = generateElement({
      tag: "h1",
      class: ["winners-title"],
      textContent: `Winners(${this.data.length})`,
    });
    this.generateTableRows(0);
    this.pages = generatePages(this.data, this.itemsPerPage, this.pages[0]);

    fragment.append(title, this.table, this.buttons);
    if (this.pages[1] === 1) {
      this.buttons.lastElementChild?.setAttribute("disabled", "true");
    } else {
      this.buttons.lastElementChild?.removeAttribute("disabled");
    }
    this.winnersBlock.append(fragment);
    this.winnersBlock.classList.add("hidden");
    document.body.append(this.winnersBlock);
  };

  private generateTable(): void {
    const tableHead = generateElement({ tag: "thead" });
    const tableBody = generateElement({ tag: "tbody" });
    const tr = generateElement({ tag: "tr" });
    const rowArr = ["№", "Image", "Name", "Wins", "Best time(sec)"];

    rowArr.forEach((item) => {
      tr.append(generateElement({ tag: "th", textContent: item }));
    });

    tableHead.append(tr);
    this.table.append(tableHead, tableBody);
  }

  public generateTableRows(startIndex: number): void {
    this.table.lastElementChild?.replaceChildren("");
    const dataToShow = this.data.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
    dataToShow.forEach((winner) => {
      const row = generateElement({ tag: "tr" });
      const rowArr = [winner.name, winner.wins, winner.time];

      row.append(generateElement({ tag: "th", textContent: `${winner.id}` }));
      const image = generateElement({ tag: "svg", color: `${winner.color}` });
      image.innerHTML = inlineSnail;
      row.append(image);
      rowArr.forEach((item) => {
        row.append(generateElement({ tag: "th", textContent: `${item}` }));
      });

      this.table.lastElementChild?.append(row);
    });
  }
}

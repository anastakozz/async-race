import { winnerObj } from "../utils/types";
import generateElement from "../utils/generateElement";
import { getWinners } from "../api/api";

export default class WinnersView {
  winnersBlock: HTMLElement;
  table: HTMLElement;
  buttons: HTMLElement;
  data: winnerObj[];
  pages: number[];
  stateChanged: boolean;

  constructor() {
    this.stateChanged = false;
    this.pages = [];
    this.data = [];
    this.winnersBlock = generateElement({
      tag: "div",
      class: ["winners-block"],
    });
    this.table = generateElement({ tag: "table", class: ["winners-table"] });
    this.buttons = this.generatePagination();
    this.generateTable();
  }

  public openWinners = async () => {
    document.querySelector(".garage-block")?.classList.add("hidden");
    this.winnersBlock.classList.remove("hidden");
  };

  public generateWinnersView = async () => {
    this.winnersBlock.replaceChildren("");
    const fragment = document.createDocumentFragment();
    const data = await getWinners();

    const title = generateElement({
      tag: "h1",
      class: ["winners-title"],
      textContent: `Winners(${data.length})`,
    });
    this.generateTableRows(data, 0);
    this.data = data;
    this.pages = [1, Math.ceil(data.length / 10)]; //this.pages = [current page, pages total]

    fragment.append(title, this.table, this.buttons);
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

  private generateTableRows(data: winnerObj[], startIndex: number): void {
    this.table.lastElementChild?.replaceChildren("");
    const dataToShow = data.slice(startIndex, startIndex + 10);
    dataToShow.forEach((winner) => {
      const row = generateElement({ tag: "tr" });
      const rowArr = [
        winner.id,
        winner.color,
        winner.name,
        winner.wins,
        winner.time,
      ];
      rowArr.forEach((item) => {
        row.append(generateElement({ tag: "th", textContent: `${item}` }));
      });
      this.table.lastElementChild?.append(row);
    });
  }

  private generatePagination(): HTMLElement {
    const paginationBlock = generateElement({ tag: "div" });
    const prevButton = generateElement({
      tag: "button",
      class: ["page-button"],
      id: "prev-btn",
      textContent: "prev",
    });
    prevButton.setAttribute("disabled", "true");
    const nextButton = generateElement({
      tag: "button",
      class: ["page-button"],
      id: "next-btn",
      textContent: "next",
    });

    paginationBlock.addEventListener("click", (event) => {
      this.changePage(event);
    });
    paginationBlock.append(prevButton, nextButton);
    return paginationBlock;
  }

  private changePage(event: Event): void {
    const id = (event.target as Element).id;
    if (id === "next-btn") {
      const startIndex = this.pages[0] * 10;
      this.generateTableRows(this.data, startIndex);
      this.buttons.firstElementChild?.removeAttribute("disabled");
      this.pages[0] += 1;

      if (this.pages[0] === this.pages[1]) {
        this.buttons.lastElementChild?.setAttribute("disabled", "true");
      }
    } else if (id === "prev-btn") {
      this.pages[0] -= 1;
      const startIndex = (this.pages[0] - 1) * 10;
      this.generateTableRows(this.data, startIndex);
      this.buttons.lastElementChild?.removeAttribute("disabled");

      if (this.pages[0] === 1) {
        this.buttons.firstElementChild?.setAttribute("disabled", "true");
      }
    }
  }
}

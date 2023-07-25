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

  public openWinners = (): void => {
    document.querySelector(".garage-block")?.classList.add("hidden");
    this.winnersBlock.classList.remove("hidden");
  };

  public generateWinnersView = async (): Promise<void> => {
    const response = await getWinners();
    this.data = response;
    this.generateWinnersContent();
    this.winnersBlock.classList.add("hidden");
  };

  private generateWinnersContent = (): void => {
    this.winnersBlock.replaceChildren("");
    const fragment = document.createDocumentFragment();
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
    document.body.append(this.winnersBlock);
  };

  private generateTable(): void {
    const tableHead = generateElement({ tag: "thead" });
    const tableBody = generateElement({ tag: "tbody" });
    const tr = generateElement({ tag: "tr" });
    const rowArr = ["№", "Image", "Name", "Wins", "Best time(sec)"];

    rowArr.forEach((item) => {
      const element = generateElement({ tag: "th", textContent: item });

      if (item === "Wins" || "Best time(sec)") {
        element.addEventListener("click", this.sortData);
      }
      tr.append(element);
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
    dataToShow.forEach((winner, index) => {
      const row = generateElement({ tag: "tr" });
      const rowArr = [winner.name, winner.wins, winner.time];

      row.append(generateElement({ tag: "th", textContent: `${index + 1}` }));
      const image = generateElement({tag: "th", children: [{ tag: "svg", color: `${winner.color}` }]});
      if(image.firstElementChild)image.firstElementChild.innerHTML = inlineSnail;
      row.append(image);
      rowArr.forEach((item) => {
        row.append(generateElement({ tag: "th", textContent: `${item}` }));
      });

      this.table.lastElementChild?.append(row);
    });
  }

  private sortData = (event: Event) => {
    const target = event.target;
    let param: string | null = "";
    if (target instanceof HTMLElement) {
      param = target.textContent;
    }

    if (param === "Wins") {
      const winsSorted = this.data.sort((a, b) => b.wins - a.wins);
      this.data = winsSorted;
      this.generateWinnersContent();
    } else if (param === "Best time(sec)") {
      const timeSorted = this.data.sort((a, b) => b.time - a.time);
      this.data = timeSorted;
      this.generateWinnersContent();
    }
    target?.removeEventListener("click", this.sortData);
    target?.addEventListener("click", this.reverseData);
  };

  private reverseData = (event: Event) => {
    const target = event.target;
    this.data.reverse();
    this.generateWinnersContent();
    target?.removeEventListener("click", this.reverseData);
    target?.addEventListener("click", this.sortData);
  }
}

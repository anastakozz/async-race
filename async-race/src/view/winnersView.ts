import { winnerObj } from "../utils/types";
import generateElement from "../utils/generateElement";
import { getWinners } from "../api/api";

export default class winnersView {
  winnersBlock: HTMLElement;
  table: HTMLElement;

  constructor() {
    this.winnersBlock = generateElement({
      tag: "div",
      class: ["winners-block"],
    });
    this.table = generateElement({ tag: "table", class: ["winners-table"] });
    this.generateTable();
  }

  generateWinnersView = async () => {
    this.winnersBlock.replaceChildren("");
    const fragment = document.createDocumentFragment();
    const data = await getWinners();

    const title = generateElement({
      tag: "h1",
      class: ["winners-title"],
      textContent: `Winners(${data.length})`,
    });
    this.generateTableRows(data);

    fragment.append(title);
    fragment.append(this.table);
    this.winnersBlock.append(fragment);
    document.body.append(this.winnersBlock);
  };

  generateTable(): void {
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

  generateTableRows(data: winnerObj[]): void {
    this.table.lastElementChild?.replaceChildren("");
    data.forEach((winner) => {
      const row = generateElement({ tag: "tr" });
      const rowArr = [winner.id, winner.color, winner.name, winner.wins, winner.time];
      rowArr.forEach((item) => {
        row.append(generateElement({ tag: "th", textContent: `${item}` }));
      });
      this.table.lastElementChild?.append(row);
    });
  }
}

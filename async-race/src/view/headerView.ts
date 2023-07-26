import generateElement from "../utils/generateElement";

export default class HeaderView {
  header: HTMLElement;
  toGarage: HTMLElement;
  toWinners: HTMLElement;

  constructor() {
    this.toGarage = generateElement({
      tag: "button",
      class: ["header-button", "btn"],
      textContent: "to Garage",
      id: "garageBtn",
    });
    this.toWinners = generateElement({
      tag: "button",
      class: ["header-button", "btn"],
      textContent: "to Winners",
      id: "winnersBtn",
    });
    this.header = this.createHeaderView();
    this.createLinks();
  }

  public createHeaderView(): HTMLElement {
    const elem = generateElement({ tag: "header" });
    const buttonWrapper = generateElement({
      tag: "span",
      class: ["button-wrapper"],
    });
    buttonWrapper.append(this.toGarage);
    buttonWrapper.append(this.toWinners);
    elem.append(buttonWrapper);
    document.body.append(elem);
    return elem;
  }

  private createLinks(): void {
    const linkDiv = generateElement({
      tag: "span",
      class: ["links-container"],
    });
    const gitLink = generateElement({
      tag: "a",
      textContent: "anastakozz 2023",
      class: ["link", "git-link"],
    });
    gitLink.setAttribute("href", "https://github.com/anastakozz");

    const courseLink = generateElement({
      tag: "a",
      class: ["link", "rss-link"],
    });
    courseLink.setAttribute("href", "https://rs.school/js");

    linkDiv.append(gitLink, courseLink);
    this.header.append(linkDiv);
  }
}

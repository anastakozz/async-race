export default class StartAnimation {
  car: HTMLElement;

  finish: number;

  track: HTMLElement | null;

  path: number;

  startTime: DOMHighResTimeStamp | null;

  startPosition: number;

  requestID: number;

  time: number;

  constructor(id: number, time: number) {
    this.time = time;
    this.track = document.getElementById(`${id}`);
    this.car = this.getItem();
    this.finish = window.innerWidth - 67;
    this.path = this.getPath();
    this.startPosition = 0;
    this.startTime = null;
    this.requestID = window.requestAnimationFrame(this.animateCar);
  }

  private getItem(): HTMLElement {
    return this.track?.querySelector('.car') as HTMLElement;
  }

  private getPath() {
    const container = this.track?.querySelector('.car-div') as HTMLElement;
    return container.offsetWidth - 55;
  }

  private animateCar = (timestamp: DOMHighResTimeStamp) => {
    if (!this.startTime) this.startTime = timestamp;
    const timeProgress = (timestamp - this.startTime) / 1000;
    this.startTime = timestamp;
    const pathProgress = this.path * (timeProgress / this.time);
    this.car.style.transform = `translateX(${(this.startPosition
      += pathProgress)}px)`;

    const position = this.car.getBoundingClientRect().x;
    if (position <= this.finish) {
      this.requestID = window.requestAnimationFrame(this.animateCar);
    } else {
      window.cancelAnimationFrame(this.requestID);
    }
  };
}

import Controller from '../controller/controller';
import { CarObj } from '../utils/types';

const baseURl = 'http://127.0.0.1:3000';

export default class ApiSetManager {
  private static manager = new ApiSetManager();

  controller: Controller | null;

  constructor() {
    this.controller = null;
  }

  public subscribe(controller: Controller): void {
    ApiSetManager.manager.controller = controller;
  }

  public getManager(): ApiSetManager {
    return ApiSetManager.manager;
  }

  public createCar = async (params: Partial<CarObj>): Promise<void> => {
    await fetch(`${baseURl}/garage`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(params),
    });
  };

  public updateCar = async (params: Partial<CarObj>): Promise<void> => {
    await fetch(`${baseURl}/garage/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(params),
    });
    ApiSetManager.manager.controller?.updateWinners();
  };

  public deleteCarFromGarage = async (param: number): Promise<void> => {
    await fetch(`${baseURl}/garage/${param}`, {
      method: 'DELETE',
    });
  };

  public deleteCarFromWinners = async (param: number): Promise<void> => {
    await fetch(`${baseURl}/winners/${param}`, {
      method: 'DELETE',
    });
    ApiSetManager.manager.controller?.updateWinners();
  };

  public createWinner = async (params: CarObj): Promise<void> => {
    await fetch(`${baseURl}/winners`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(params),
    });
    ApiSetManager.manager.controller?.updateWinners();
  };

  public updateWinner = async (params: CarObj): Promise<void> => {
    await fetch(`${baseURl}/winners/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(params),
    });
    ApiSetManager.manager.controller?.updateWinners();
  };
}

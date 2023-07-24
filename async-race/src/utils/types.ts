export type carObj = {
  id?: number;
  color?: string;
  name?: string;
  wins?: number;
  time?: number;
};

export type markUp = {
  tag: string;
  class?: string[];
  type?: string;
  setData?: string;
  id?: string;
  textContent?: string;
  color?: string;
  children?: markUp[];
};

export type driveParams = {
  velocity: number;
  distance: number;
};

export type driveResponse = { success: true };

export type raceResult = {
  id: number;
  time: number;
}

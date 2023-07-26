export type CarObj = {
  id: number;
  color: string;
  name: string;
  wins: number;
  time: number;
};

export type MarkUp = {
  tag: string;
  class?: string[];
  type?: string;
  setData?: string;
  id?: string;
  textContent?: string;
  color?: string;
  children?: MarkUp[];
};

export type DriveParams = {
  velocity: number;
  distance: number;
};

export type DriveResponse = { success: true };

export type RaceResult = {
  id: number;
  time: number;
};

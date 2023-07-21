export type carObj = {
  id: number;
  color?: string;
  name?: string;
  wins?: number;
  time?: number;
};

export type markUp = {
  tag: string;
  class?: string[];
  type?: string;
  id?: string;
  textContent?: string
  children?: markUp[];
}

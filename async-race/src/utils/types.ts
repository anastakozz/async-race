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
  setData?: string,
  id?: string;
  textContent?: string;
  color?: string;
  children?: markUp[];
}

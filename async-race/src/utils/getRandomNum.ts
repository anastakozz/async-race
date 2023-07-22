export default function getRandomNum(min:number, max:number): number {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min
  );
}

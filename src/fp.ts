type Card = {
  name: string;
  winingNumbers: number[];
  numbers: number[];
};

const add = (acc: number, point: number): number => acc + point;
const readFile = (input: string) => Deno.readTextFileSync(input);
const getLines = (str: string): string[] => str.split('\n');
const isNotEmpty = (x: string): boolean => x !== '';
const filterEmptyStrings = (strs: string[]): string[] =>
  strs.filter(isNotEmpty);

function parseLine(numStr: string): number[] {
  const strArray = numStr.split(' ');
  const result: number[] = [];

  for (const str of strArray) {
    if (str === '') continue;
    result.push(Number.parseInt(str));
  }

  return result;
}

const toCard = (str: string): Card => {
  const [name, rest] = str.split(':');
  const [leftNums, rightNums] = rest.split('|');

  const winingNumbers = parseLine(leftNums);
  const numbers = parseLine(rightNums);

  return { name, winingNumbers, numbers };
};

function solution() {
  const file = readFile('./input');
  const lines = getLines(file);
  const linesWithoutEmptySpace = filterEmptyStrings(lines);
  const cards: Card[] = linesWithoutEmptySpace.map((line) => toCard(line));

  const points = cards.map((card) => {
    let cardPoint = 0;
    for (const num of card.numbers) {
      if (card.winingNumbers.includes(num)) {
        if (cardPoint === 0) cardPoint = 1;
        else cardPoint *= 2;
      }
    }
    return cardPoint;
  });
  const sum = points.reduce(add, 0);
  console.log(sum);
}
solution();

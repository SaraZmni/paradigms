// Define the Card type
type Card = {
  name: string;
  winingNumbers: number[];
  numbers: number[];
}

export function parseLine(numStr: string): number[] {
  const strArray = numStr.split(" ");
  const result: number[] = [];
    
  for (const str of strArray) {
    if (str === '') continue;
    result.push(Number.parseInt(str));
  }
    
  return result;
}

export function solution(): void {
  // Read file
  const file = Deno.readTextFileSync('./input');
  const cards: Card[] = [];

  const lines = file.split('\n');

  for (const line of lines) {
    if (line === '') continue;
    
    const [name, rest] = line.split(':');
    const [leftNums, rightNums] = rest.split('|');

    const winingNumbers = parseLine(leftNums);
    const numbers = parseLine(rightNums);
    
    cards.push({
      name,
      winingNumbers,
      numbers
    });
  }

  console.log(cards);
}

solution();
// Define the Card type
type Card = {
  name: string;
  winingNumbers: number[];
  numbers: number[];
};

export function parseLine(numStr: string): number[] {
  const strArray = numStr.split(" ");
  const result: number[] = [];
    
  for (const str of strArray) {
    if (str === '') continue;
    result.push(Number.parseInt(str));
  }
    
  return result;
}

function readFile(){
  return Deno.readTextFileSync('./input');
}

function parseData(file:string) {
 
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

  return cards
}

function calculatePoint(card:Card) {
  let cardPoint = 0;
  for (const num of card.numbers) {
    if (card.winingNumbers.includes(num)) {
      if (cardPoint === 0) cardPoint = 1;
      else cardPoint *= 2;
    }
  } 
  return cardPoint
}

function calculateSum(cards:Card[]) {
  let sumPoints = 0;

    for (const card of cards) {
     let cardPoint = calculatePoint(card)   
        sumPoints += cardPoint; 
    }
  return sumPoints
}

function print(sumPoints:number){
  console.log(sumPoints)
}

export function solution(): void {
  try {
   
    const file = readFile()
    let cards = parseData(file)    
    let sumPoints = calculateSum(cards)
    print(sumPoints)
    
  } catch (error) {
    console.error('Error:', error);
  }
}

solution();

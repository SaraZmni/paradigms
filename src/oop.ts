interface CardProps {
  name: string;
  winingNumbers: number[];
  numbers: number[];
}

class CardPuzzle {
  solve() {
    const file = new PuzzleFile('./input');
    const hand = file.parse();
    const printer = new Leaderboard(hand);
    printer.print();
  }
}

class Hand {
  constructor(private cards: Card[]) {}

  getSumPoints() {
    return this.cards.reduce((acc, card) => card.point + acc, 0);
  }
}

class Card {
  private name: string;
  private winingNumbers: number[];
  private numbers: number[];

  constructor(props: CardProps) {
    this.name = props.name;
    this.winingNumbers = props.winingNumbers;
    this.numbers = props.numbers;
  }

  get point() {
    let cardPoint = 0;
    for (const num of this.numbers) {
      if (this.winingNumbers.includes(num)) {
        if (cardPoint === 0) cardPoint = 1;
        else cardPoint *= 2;
      }
    }
    return cardPoint;
  }
}

class File {
  #content: string | undefined;

  constructor(private path: string) {}

  get content() {
    if (this.#content == null) throw Error('Cannot return the content of file');
    return this.#content;
  }

  get lines() {
    if (this.#content == null) throw Error('Cannot return the content of file');
    return this.#content.split('\n').filter(Boolean);
  }

  read() {
    this.#content = Deno.readTextFileSync(this.path);
  }
}

class PuzzleFile {
  private content: string;
  private lines: string[];

  constructor(filePath: string) {
    this.content = Deno.readTextFileSync(filePath);
    this.lines = this.content.split('\n');
  }

  private parseLine(numStr: string): number[] {
    const strArray = numStr.split(' ');
    const result: number[] = [];

    for (const str of strArray) {
      if (str === '') continue;
      result.push(Number.parseInt(str));
    }

    return result;
  }

  parse(): Hand {
    const cards: Card[] = [];

    for (const line of this.lines) {
      if (line === '') continue;

      const [name, rest] = line.split(':');
      const [leftNums, rightNums] = rest.split('|');

      const winingNumbers = this.parseLine(leftNums);
      const numbers = this.parseLine(rightNums);

      const card = new Card({
        name,
        winingNumbers,
        numbers,
      });
      cards.push(card);
    }

    return new Hand(cards);
  }
}

class Leaderboard {
  constructor(private hand: Hand) {}

  print() {
    console.log(this.hand.getSumPoints());
  }
}

// Run the puzzle
new CardPuzzle().solve();

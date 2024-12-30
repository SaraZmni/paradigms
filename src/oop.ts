// Define the Card type
type Card = {
  name: string;
  winingNumbers: number[];
  numbers: number[];
};



class solution{

   solve() {
    const file = this.readFile()
    let cards = this.parseData(file)    
    let sumPoints = this.calculateSum(cards)
    this.print(sumPoints)
   } 
    private readFile(){
    return Deno.readTextFileSync('./input');
    }
    private parseData(file:string) {
    
        const cards: Card[] = [];

        const lines = file.split('\n');

        for (const line of lines) {
        if (line === '') continue;
        
        const [name, rest] = line.split(':');
        const [leftNums, rightNums] = rest.split('|');

        const winingNumbers = this.parseLine(leftNums);
        const numbers = this.parseLine(rightNums);
        
        cards.push({
            name,
            winingNumbers,
            numbers
        });
        }

    return cards
    }
    private parseLine(numStr: string): number[] {
        const strArray = numStr.split(" ");
        const result: number[] = [];
    
        for (const str of strArray) {
        if (str === '') continue;
            result.push(Number.parseInt(str));
    }
    
    return result;
    }
    private calculatePoint(card:Card) {
    let cardPoint = 0;
    for (const num of card.numbers) {
        if (card.winingNumbers.includes(num)) {
        if (cardPoint === 0) cardPoint = 1;
        else cardPoint *= 2;
        }
    } 
    return cardPoint
    }
    private calculateSum(cards:Card[]) {
    let sumPoints = 0;

        for (const card of cards) {
        let cardPoint = this.calculatePoint(card)   
            sumPoints += cardPoint; 
        }
    return sumPoints
    }
    private print(sumPoints:number){
    console.log(sumPoints)
    }
}


new solution().solve()

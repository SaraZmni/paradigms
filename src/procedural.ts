type Card = {
  name:string;
  winingNumbers:number[];
  numbers:number[];
}

function solution() {
  // Read file
  const file = Deno.readTextFileSync('./input');
  const cards:Card[] = [];

  // Parse the data
  const lines = file.split('\n')
  console.log(lines)

  for(const line of lines){
    if (line === '') continue;
    // const name = line.split(':')[0]
    // const rest = line.split(':')[1]
    const [name,rest] = line.split(':')
    const [leftNums,rightNums] = rest.split('|')

    let winingNumbersStr:string[] = leftNums.split(" ")
    let winingNumbersInt:number[] = [];

    for(const winNumberStr of winingNumbersStr){
      if(winNumberStr === '') continue

      winingNumbersInt.push(Number.parseInt(winNumberStr))
    }
    
    let numbersStr:string[] = rightNums.split(" ")
    let numbersInt:number[] = [];

    for(const numberStr of numbersStr){
      if(numberStr === '') continue

      numbersInt.push(Number.parseInt(numberStr))
    }
    
    cards.push({
      name,
      winingNumbers:winingNumbersInt,
      numbers:numbersInt
    })
    
 
  }
}

solution();

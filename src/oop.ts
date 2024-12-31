
class CardPuzzle {
    solve(){
      const file = new File('./input'); 
      const data = file.read()
      console.log(file.lines)
    }
}


class File {
    #content: string | undefined;
    constructor(private path:string){}
 
    get content(){
        if(this.#content == null) throw Error('Cannot return the content of file')
        return this.#content
    }
    get lines(){
        if(this.#content == null) throw Error('Cannot return the content of file')
        return this.#content.split("\n").filter(Boolean)
    }
    read(){
        this.#content = Deno.readTextFileSync(this.path)
    }
}

new CardPuzzle().solve();
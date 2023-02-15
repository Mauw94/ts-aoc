import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  open: Map<string, string> = new Map()

  public solveFirst(): string {
    this.open.set("(", ")")
    this.open.set("[", "]")
    this.open.set("{", "}")
    this.open.set("<", ">")

    const lines = this.parseInput()
    let illegals = []
    let total = 0
    for (const line of lines) {
      let illegal = this.isCorrupt(line)
      if (illegal !== undefined) {
        illegals.push(illegal)
      }
    }

    for (const i of illegals) {
      if (i === ")") {
        total += 3
      } else if (i === "]") {
        total += 57
      } else if (i === "}") {
        total += 1197
      } else if (i === ">") {
        total += 25137
      }
    }

    return total.toString();
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 1 solution 2';
  }

  isCorrupt(line: string) {
    const stack = []
    line = line.replace("\r", "")
    for (let i = 0; i < line.length; i++) {
      console.log(i)
      if (this.open.has(line[i])) {
        stack.push(line[i])
      } else {
        const v = stack.pop()
        if (this.open.get(v) !== line[i]) {
          return line[i]
        }
      }
    }
  }

  parseInput() {
    return this.input.split("\n")
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }

}

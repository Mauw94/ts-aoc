import Puzzle from '../../types/AbstractPuzzle';

type Corrupt = { _tag: "Corrupt", char: string }
type Incomplete = { _tag: "Incomplete", chars: string[] }
type Complete = { _tag: "Complete" }
type Result = Corrupt | Incomplete | Complete

export default class ConcretePuzzle extends Puzzle {

  open: Map<string, string>

  public solveFirst(): string {
    this.open = new Map()
    this.open.set("(", ")")
    this.open.set("[", "]")
    this.open.set("{", "}")
    this.open.set("<", ">")

    const lines = this.parseInput()
    let illegals = []
    let total = 0
    for (const line of lines) {
      let illegal = this.checkLine(line)
      if (illegal._tag === "Corrupt") {
        illegals.push(illegal.char)
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
    this.open = new Map()
    this.open.set("(", ")")
    this.open.set("[", "]")
    this.open.set("{", "}")
    this.open.set("<", ">")

    const lines = this.parseInput()
    let total = []

    for (const line of lines) {
      let inCompleteStack = this.checkLine(line)
      if (inCompleteStack._tag === "Incomplete") {
        total.push(this.calculateIncompleteSet(inCompleteStack.chars))
      }
    }

    total.sort((a, b) => b - a)
    const res = total[Math.round(total.length / 2) - 1]

    return res.toString();
  }

  calculateIncompleteSet(stack: string[]) {
    let total = 0
    while (stack.length > 0) {
      const v = this.open.get(stack.pop())
      if (v === ")") {
        total *= 5
        total += 1
      } else if (v === "]") {
        total *= 5
        total += 2
      } else if (v === "}") {
        total *= 5
        total += 3
      } else {
        total *= 5
        total += 4
      }
    }

    return total
  }

  checkLine(line: string): Result {
    const stack = []
    line = line.replace("\r", "")
    for (let i = 0; i < line.length; i++) {
      if (this.open.has(line[i])) {
        stack.push(line[i])
      } else {
        const v = stack.pop()
        if (this.open.get(v) !== line[i]) {
          return { _tag: "Corrupt", char: line[i] }
        }
      }
    }
    if (stack.length > 0) {
      return { _tag: "Incomplete", chars: stack }
    }

    return { _tag: "Complete" }
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

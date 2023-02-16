import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  o: number[][] = []

  public solveFirst(): string {

    this.o = this.createCave()

    const start = Date.now()
    const res = this.flash(100).toString()
    const end = Date.now()

    console.log(`Execution time: ${end - start} ms`)

    return res
  }

  public solveSecond(): string {
    this.o = this.createCave()
    const totalO = this.o.reduce((currentC, row) => currentC + row.length, 0)
    let step = 0

    const start = Date.now()
    while (true) {
      step++
      const flashes = this.increaseLevels()
      if (flashes === totalO) {
        break
      }
    }
    const end = Date.now()
    console.log(`Execution time: ${end - start} ms`)

    return step.toString();
  }

  flash(steps: number) {
    let total = 0
    for (let i = 0; i < steps; i++) {
      total += this.increaseLevels()
    }

    return total
  }

  increaseLevels() {
    const flash: [number, number][] = []
    const seen: string[] = []

    for (let i = 0; i < this.width(); i++) {
      for (let j = 0; j < this.height(); j++) {
        this.o[i][j]++
        if (this.o[i][j] > 9) {
          seen.push(`{x:${i},y:${j}}`)
          flash.push([i, j])
        }
      }
    }
    this.flashNeighbours(flash, seen)

    return this.setAllFlashedToZero(seen)
  }

  setAllFlashedToZero(seen: string[]) {
    const N: [number, number][] = []
    let flashes = 0

    for (let i = 0; i < seen.length; i++) {
      const s = seen[i]
      const n = s.replace(/\D/g, "");
      const digits = n.toString().split('')
      const rDigits = digits.map(Number)
      N.push([rDigits[0], rDigits[1]])
    }

    for (let i = 0; i < N.length; i++) {
      const n = N[i]
      this.o[n[0]][n[1]] = 0
      flashes++
    }

    return flashes
  }

  flashNeighbours(flash: [number, number][], seen: string[]) {
    while (flash.length > 0) {
      const f = flash.pop()
      const neighbours = this.adjacent(f[0], f[1])
      for (let i = 0; i < neighbours.length; i++) {
        const n = neighbours[i]
        this.o[n[0]][n[1]]++
        if (this.o[n[0]][n[1]] > 9 && !seen.includes(`{x:${n[0]},y:${n[1]}}`)) {
          seen.push(`{x:${n[0]},y:${n[1]}}`)
          flash.push([n[0], n[1]])
        }
      }
    }
  }

  createCave() {
    const o: number[][] = []
    const lines = this.input.split("\n")
    for (let i = 0; i < lines.length; i++) {
      o[i] = []
      const line = lines[i].replace("\r", "").split("")
      for (let j = 0; j < line.length; j++) {
        o[i].push(+line[j])
      }
    }

    return o
  }

  adjacent(x: number, y: number) {
    const neighbours: [number, number][] = []
    neighbours.push([x - 1, y])
    neighbours.push([x + 1, y])
    neighbours.push([x, y - 1])
    neighbours.push([x, y + 1])
    neighbours.push([x - 1, y - 1])
    neighbours.push([x - 1, y + 1])
    neighbours.push([x + 1, y - 1])
    neighbours.push([x + 1, y + 1])

    return neighbours.filter(n =>
      n[0] >= 0 &&
      n[0] < this.width() &&
      n[1] >= 0 &&
      n[1] < this.height())
  }

  width(): number {
    return this.o.length
  }

  height(): number {
    return this.o[0].length
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

}

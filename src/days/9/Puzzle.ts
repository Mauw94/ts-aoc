import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  public solveFirst(): string {

    const m = this.createHeightmap()
    let lowPoints = []

    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[0].length; j++) {
        const p = m[i][j]
        const n = this.adjacent(i, j, m.length, m[0].length)

        if (this.isLowestPoint(p, m, n)) {
          lowPoints.push(p + 1)
        }
      }
    }

    console.log(lowPoints.reduce((a, b) => a + b))

    return 'day 1 solution 1';
  }

  isLowestPoint(p: number, m: number[][], n: [number, number][]) {
    for (let k = 0; k < n.length; k++) {
      if (p >= m[n[k][0]][n[k][1]]) {
        return false
      }
    }

    return true
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 1 solution 2';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }

  private createHeightmap(): number[][] {
    const m: number[][] = []
    const lines = this.input.split("\n")
    for (let i = 0; i < lines.length; i++) {
      m[i] = []
      const line = lines[i].replace("\r", "").split("")
      for (let j = 0; j < line.length; j++) {
        m[i].push(+line[j])
      }
    }

    // console.log(m)
    return m
  }

  private adjacent(x: number, y: number, width: number, height: number): [number, number][] {
    const neighbours: [number, number][] = []
    neighbours.push([x - 1, y])
    neighbours.push([x + 1, y])
    neighbours.push([x, y + 1])
    neighbours.push([x, y - 1])

    return neighbours.filter(x =>
      x[0] >= 0 &&
      x[0] < width &&
      x[1] >= 0 &&
      x[1] < height)
  }
}

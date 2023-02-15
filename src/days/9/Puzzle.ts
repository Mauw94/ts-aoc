import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  private m: number[][]

  public solveFirst(): string {

    this.m = this.createHeightmap()
    let lowPoints = []

    for (let i = 0; i < this.m.length; i++) {
      for (let j = 0; j < this.m[0].length; j++) {
        const p = this.getPoint(i, j)
        const n = this.adjacent(i, j)

        if (this.isLowestPoint(p, n)) {
          lowPoints.push(p + 1)
        }
      }
    }

    return lowPoints.reduce((a, b) => a + b).toString()
  }

  isLowestPoint(p: number, n: [number, number][]) {
    for (let k = 0; k < n.length; k++) {
      if (p >= this.getPoint(n[k][0], n[k][1])) {
        return false
      }
    }

    return true
  }

  getPoint(x: number, y: number) {
    return this.m[x][y]
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {

    this.m = this.createHeightmap()
    let basins = []
    for (let i = 0; i < this.m.length; i++) {
      for (let j = 0; j < this.m[0].length; j++) {
        const p = this.getPoint(i, j)
        const n = this.adjacent(i, j)

        if (this.isLowestPoint(p, n)) {
          // calculate basin
          basins.push(this.calcualteBasin(i, j))
        }
      }
    }

    basins.sort((a, b) => b - a)
    const res = basins[0] * basins[1] * basins[2]

    return res.toString()
  }

  // flood fill
  private calcualteBasin(x: number, y: number): number {
    let n: [number, number][] = []
    let basin: string[] = []

    n.push([x, y])
    basin.push(`{x:${x},y:${y}}`)

    while (n.length > 0) {
      let next = n.pop()
      let adj = this.adjacent(next[0], next[1])

      const flow = adj.filter(a => this.getPoint(a[0], a[1]) > this.getPoint(next[0], next[1])
        && this.getPoint(a[0], a[1]) < 9)

      for (let i = 0; i < flow.length; i++) {
        if (basin.includes(`{x:${flow[i][0]},y:${flow[i][1]}}`)) {
          continue
        }

        n.push(flow[i])
        basin.push(`{x:${flow[i][0]},y:${flow[i][1]}}`)
      }
    }

    return basin.length
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

    return m
  }

  private adjacent(x: number, y: number): [number, number][] {
    const neighbours: [number, number][] = []
    neighbours.push([x - 1, y])
    neighbours.push([x + 1, y])
    neighbours.push([x, y + 1])
    neighbours.push([x, y - 1])

    return neighbours.filter(x =>
      x[0] >= 0 &&
      x[0] < this.m.length &&
      x[1] >= 0 &&
      x[1] < this.m[0].length)
  }


  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

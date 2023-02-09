import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const input = this.parseInput()
    let allPoints: { x: number, y: number }[] = []
    let overlaps = 0

    for (const line of input) {
      let points = line.split(' -> ')
      let x1 = +points[0].split(',')[0]
      let y1 = +points[0].split(',')[1]
      let x2 = +points[1].split(',')[0]
      let y2 = +points[1].split(',')[1]

      const foundPoints = this.getAllPointsBetween(x1, y1, x2, y2)
      for (const po of foundPoints) {
        allPoints.push(po)
      }
    }

    let pointsOverlap = new Map<string, boolean>()
    for (let gridPoint of allPoints) {
      const key = `${gridPoint.x},${gridPoint.y}`
      if (pointsOverlap.has(key)) {
        pointsOverlap.set(key, true)
      } else {
        pointsOverlap.set(key, false)
      }
    }

    for (let isOverlop of pointsOverlap.values()) {
      if (isOverlop) {
        overlaps++
      }
    }

    console.log(overlaps)

    return 'day 1 solution 1';
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

  private parseInput() {
    return this.input.split('\n').map(x => x.trim())
  }

  private getAllPointsBetween(x1: number, y1: number, x2: number, y2: number) {
    if (x1 !== x2 && y1 !== y2) return []

    let points = []

    let startX = x1 > x2 ? x2 : x1
    let endX = x1 > x2 ? x1 : x2

    let startY = y1 > y2 ? y2 : y1
    let endY = y1 > y2 ? y1 : y2

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        points.push({ x, y })
      }
    }

    return points
  }
}

import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  public solveFirst(): string {
    const input = this.parseInput()
    const n = [...input]
    const median = this.getMedian(n)
    let total = 0

    for (let i = 0; i < input.length; i++) {
      let fuel = input[i] - median
      if (fuel < 0) {
        fuel *= -1
      }

      total += fuel
    }

    return total.toString();
  }

  public getFirstExpectedResult(): string {
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    const n = this.parseInput()
    const mean = Math.round((n.reduce((a, b) => a + b, 0)) / n.length)
    let total = 0

    for (let i = 0; i < n.length; i++) {
      let fuel = n[i] - mean
      if (fuel < 0) {
        fuel *= -1
      }

      let temp = 0
      let adjust = 0
      for (let j = 0; j < fuel; j++) {
        temp++
        adjust += temp
      }

      total += adjust
    }

    return total.toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }

  private parseInput() {
    return this.input.split(',').map(x => +x)
  }

  private getMedian(n: number[]) {
    n.sort((a, b) => a - b)
    const size = n.length
    const mid = Math.floor(size / 2)

    return (size % 2 === 1) ? n[mid] : (n[mid] + n[mid - 1]) / 2
  }
}

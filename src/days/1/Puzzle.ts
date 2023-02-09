import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  public solveFirst(): string {
    const numbers = this.input.split('\n').map(n => +n)
    return this.countIncrements(numbers)
  }

  public solveSecond(): string {
    const numbers = this.input.split('\n').map(n => +n)
    const grouped = this.group(numbers, 3)

    return this.countIncrements(grouped)
  }

  private countIncrements(arr: number[]): string {
    let count = 0
    for (const [index, value] of arr.slice().entries()) {
      if (value > arr[index - 1]) {
        count++
      }
    }

    return count.toString()
  }

  private group(arr: number[], n: number) {
    let j = 0
    let group = []
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
      if (i == arr.length) break
      sum += arr[i]
      j++

      if (j === n) {
        group.push(sum)
        sum = 0
        i -= 2
        j = 0
      }
    }

    return group
  }

  public getFirstExpectedResult(): string {
    return '7';
  }
  public getSecondExpectedResult(): string {
    return '5';
  }
}

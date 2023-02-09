import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  public solveFirst(): string {
    let states = this.parseInput()

    for (let i = 0; i < 80; i++) {
      for (let j = 0; j < states.length; j++) {
        if (states[j] - 1 < 0) {
          states.push(9)
          states[j] = 6
        } else {
          states[j]--
        }
      }
    }

    return states.length.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    const lanternfish: number[] = []
    const input = this.parseInput()

    for (let i = 0; i < 9; i++) {
      lanternfish[i] = 0
    }

    input.forEach(timer => {
      lanternfish[timer]++
    })

    const res = this.afterNDays(lanternfish, 256)

    return res.toString()
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }

  private afterNDays(fish: number[], days: number) {
    for (let i = 0; i < days; i++) {
      this.grow(fish)
    }

    return fish.reduce((a, b) => a + b)
  }

  private grow(fish: number[]) {
    const tempZ = fish[0]
    for (let i = 0; i < 8; i++) {
      fish[i] = fish[i + 1]
    }
    fish[8] = tempZ
    fish[6] += tempZ
  }

  private parseInput() {
    return this.input.split(',').map(x => +x)
  }
}
import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  open = ["(", "[", "{", "<"]
  close = [")", "]", "}", ">"]

  public solveFirst(): string {
    const lines = this.parseInput()

    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 1 solution 2';
  }

  solve(line: string) {

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

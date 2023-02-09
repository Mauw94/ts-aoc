import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  public solveFirst(): string {
    const arr = this.getInputArray()
    let forward: number = 0
    let depth: number = 0

    for (let i = 0; i < arr.length; i++) {
      const command = arr[i].split(' ')
      if (command[0] == 'forward') {
        forward += +command[1]
      } else if (command[0] == 'down') {
        depth += +command[1]
      } else if (command[0] == 'up') {
        depth -= +command[1]
      }
    }

    const res = forward * depth
    return res.toString();
  }

  public getFirstExpectedResult(): string {
    return '150'
  }

  public solveSecond(): string {
    const arr = this.getInputArray()
    let forward: number = 0
    let depth: number = 0
    let aim: number = 0

    for (let i = 0; i < arr.length; i++) {
      const command = arr[i].split(' ')
      if (command[0] == 'forward') {
        forward += +command[1]
        depth += aim * +command[1]
      } else if (command[0] == 'down') {
        aim += +command[1]
      } else if (command[0] == 'up') {
        aim -= +command[1]
      }
    }

    const res = forward * depth
    return res.toString();
  }

  public getSecondExpectedResult(): string {
    return '900';
  }

  private getInputArray(): string[] {
    return this.input.split('\n')
  }
}

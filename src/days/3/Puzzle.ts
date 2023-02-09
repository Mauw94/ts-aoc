import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  public solveFirst(): string {
    let gamma: string = ""
    let epsilon: string = ""

    const input = this.input.split('\n').map(x => x.trim())
    const N = input[0].length

    for (let i = 0; i < N; i++) {
      const col = input.map(function (value, index) { return value[i] })
      const { zeros, ones } = this.countZerosAndOnes(col)

      if (ones > zeros) {
        gamma += '1'
        epsilon += '0'
      } else {
        gamma += '0'
        epsilon += '1'
      }
    }

    const res = parseInt(gamma, 2) * parseInt(epsilon, 2)

    return res.toString();
  }

  public getFirstExpectedResult(): string {
    return '198';
  }

  public solveSecond(): string {
    const input = this.input.split('\n').map(x => x.trim())
    const N = input[0].length
    let copy = [...input]

    const oxygen = this.calculateOxygen(N, copy)
    copy = [...input] // reset copy
    const co2 = this.calculateCO2(N, copy)
    const res = parseInt(oxygen, 2) * parseInt(co2, 2)

    return res.toString();
  }

  public getSecondExpectedResult(): string {
    return '230';
  }

  private countZerosAndOnes(line: string[]) {
    let ones = 0
    let zeros = 0
    for (const s of line) {
      s === '1' ? ++ones : ++zeros
    }

    return { zeros, ones }
  }

  private calculateOxygen(N: number, copy: string[]): string {
    for (let i = 0; i < N; i++) {
      const col = copy.map(function (value, index) { return value[i] })
      const { zeros, ones } = this.countZerosAndOnes(col)
      if (copy.length === 1) {
        break
      }

      if (ones >= zeros) {
        copy = copy.filter(x => x[i] === '1')
      } else if (ones < zeros) {
        copy = copy.filter(x => x[i] === '0')
      }
    }

    return copy[0]
  }

  private calculateCO2(N: number, copy: string[]): string {
    for (let i = 0; i < N; i++) {
      const col = copy.map(function (value, index) { return value[i] })
      const { zeros, ones } = this.countZerosAndOnes(col)
      if (copy.length === 1) {
        break
      }

      if (ones >= zeros) {
        copy = copy.filter(x => x[i] === '0')
      } else if (ones < zeros) {
        copy = copy.filter(x => x[i] === '1')
      }
    }

    return copy[0]
  }
}

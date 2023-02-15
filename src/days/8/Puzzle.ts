import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  public solveFirst(): string {
    return this.sovle().toString()
  }

  public getFirstExpectedResult(): string {

    return '456'
  }

  public solveSecond(): string {

    return this.solve2().toString()
  }

  public getSecondExpectedResult(): string {

    return 'day 1 solution 2'
  }

  private solve2() {
    let total: string[] = []
    const arr = this.input.replace("\r", "").split("\n")
    arr.forEach(input => {
      const delim = input.indexOf("|")
      const pattern = input.substring(0, delim)
      const digits = input.substring(delim + 2)
      const patternArr = this.findPattern(pattern)
      total.push(this.calculate(digits, patternArr))
    })

    return total
  }

  findPattern(pattern: string): Map<string, number> {
    const nPatterns: Map<string, number> = new Map()

    const patterns = pattern.replace("\r", "").split(" ")
    const eight = patterns.find(p => p.length === 7)
    const seven = patterns.find(p => p.length === 3)
    const four = patterns.find(p => p.length === 4)
    const one = patterns.find(p => p.length === 2)
    const top = this.calculateTopSeg(one, seven)
    const { topRight, six } = this.calculateTopRight(one, patterns.filter(p => p.length === 6))
    const { zero, nine } = this.calculateZeroAndNine(patterns.filter(p => p.length === 6), six, four, top)
    const { middle, bottomLeft } = this.calculateMiddleBottomLeft(zero, nine)
    const bottomRight = this.calculateBottomRight(one, six)
    const { topLeft, five } = this.calculateTopLeft(patterns.filter(p => p.length === 5), topRight, bottomLeft, bottomRight, eight)
    const { two, three } = this.calculateTwoAndThree(five, patterns.filter(p => p.length === 5), bottomRight)

    nPatterns.set(one.split('').sort().join(''), 1)
    nPatterns.set(two.split('').sort().join(''), 2)
    nPatterns.set(three.split('').sort().join(''), 3)
    nPatterns.set(four.split('').sort().join(''), 4)
    nPatterns.set(five.split('').sort().join(''), 5)
    nPatterns.set(six.split('').sort().join(''), 6)
    nPatterns.set(seven.split('').sort().join(''), 7)
    nPatterns.set(eight.split('').sort().join(''), 8)

    return nPatterns
  }

  calculate(digit: string, patterns: Map<string, number>) {
    let total: string[] = []
    const digits = digit.replace("\r", "").split(" ")

    for (let d of digits) {
      d = d.split('').sort().join('')
      const v = patterns.get(d)
      total.push(v.toString())
    }

    return total.join('')
  }

  calculateTopSeg(seg1: string, seg2: string) {
    let res = []

    for (let i = 0; i < seg2.length; i++) {
      if (!seg1.includes(seg2[i])) {
        res.push(seg2[i])
      }
    }

    return res.join()
  }

  calculateTopRight(one: string, nineSixZero: string[]) {
    let six = ""
    let topRight = ""
    for (let i = 0; i < nineSixZero.length; i++) {
      if (!nineSixZero[i].includes(one[0]) || !nineSixZero[i].includes(one[1])) {
        six = nineSixZero[i]
        break
      }
    }

    for (let i = 0; i < one.length; i++) {
      if (!six.includes(one[i])) {
        topRight = one[i]
        break
      }
    }
    return { topRight, six }
  }

  calculateZeroAndNine(nineSixZero: string[], six: string, four: string, top: string) {
    const nineZero = nineSixZero.filter(n => n !== six)
    const fourWithTop = four + top
    let zero = ""
    let nine = ""
    for (let i = 0; i < fourWithTop.length; i++) {
      if (!nineZero[0].includes(fourWithTop[i])) {
        zero = nineZero[0]
        nine = nineZero[1]
      } else {
        zero = nineZero[1]
        nine = nineZero[0]
      }
    }

    return { zero, nine }
  }

  calculateMiddleBottomLeft(zero: string, nine: string) {
    let bottomLeft = ""
    let middle = ""
    for (let i = 0; i < zero.length; i++) {
      if (!nine.includes(zero[i])) {
        bottomLeft = zero[i]
        break
      }
    }

    for (let i = 0; i < nine.length; i++) {
      if (!zero.includes(nine[i])) {
        middle = nine[i]
        break
      }
    }

    return { bottomLeft, middle }
  }

  calculateBottomRight(one: string, six: string) {
    if (!six.includes(one[0])) {
      return one[1]
    }

    if (!six.includes(one[1])) {
      return one[0]
    }
  }

  calculateTopLeft(twoThreeFive: string[], topRight: string, bottomLeft: string, bottomRight: string, eight: string) {
    let topLeft = ""
    const newTwoThreeFive: string[] = []

    twoThreeFive.forEach(n => {
      if (!n.includes(topRight)) {
        n += topRight
      }
      if (!n.includes(bottomLeft)) {
        n += bottomLeft
      }
      if (!n.includes(bottomRight)) {
        n += bottomRight
      }
      newTwoThreeFive.push(n)
    })

    // find 5 => the one with length 7 now
    let five = newTwoThreeFive.find(p => p.length === 7)
    for (let i = 0; i < five.length; i++) {
      if (!twoThreeFive[0].includes(five[i])) {
        topLeft = five[i]
        break
      }
    }

    let nFive = []
    for (let i = 0; i < five.length; i++) {
      if (five[i] !== topRight && five[i] !== bottomLeft) {
        nFive.push(five[i])
      }
    }

    five = nFive.join()
    const re = new RegExp(",", 'g')
    five = five.replace(re, "")

    return { topLeft, five }
  }

  calculateTwoAndThree(five: string, twoThreeFive: string[], bottomRight: string) {
    const twoThree = twoThreeFive.filter(t => t !== five)
    let two = ""
    let three = ""
    if (!twoThree[0].includes(bottomRight)) {
      two = twoThree[0]
      three = twoThree[1]
    }
    if (!twoThree[1].includes(bottomRight)) {
      two = twoThree[1]
      three = twoThree[0]
    }

    return { two, three }
  }

  private sovle() {
    let totalCount = 0
    const inputArr = this.input.replace("\r", "").split("\n")
    inputArr.forEach(input => {
      const delim = input.indexOf("|")
      const pattern = input.substring(0, delim)
      const digits = input.substring(delim + 2)
      totalCount += this.countDigits(digits)
    })

    return totalCount
  }

  private countDigits(digits: string) {
    let count = 0
    const digitArr = digits.replace("\r", "").split(" ")

    for (let i = 0; i < digitArr.length; i++) {
      if (digitArr[i].length === 2
        || digitArr[i].length === 3
        || digitArr[i].length === 4
        || digitArr[i].length === 7) {
        count++
      }
    }

    return count
  }
}

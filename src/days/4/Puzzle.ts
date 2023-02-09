import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const input = this.parseInput()
    const drawNumbers = input[0].split(',').map(x => +x)
    const boards = this.setupBingoBoards(input)
    const { board, n } = this.play(drawNumbers, boards)

    const res = board.getScore() * n
    return res.toString();
  }

  public getFirstExpectedResult(): string {
    return '4512';
  }

  public solveSecond(): string {
    const input = this.parseInput()
    const drawNumbers = input[0].split(',').map(x => +x)
    const boards = this.setupBingoBoards(input)
    const { board, n } = this.findLastBoardToWin(drawNumbers, boards)

    const res = board.getScore() * n

    return res.toString();
  }

  public getSecondExpectedResult(): string {
    return '1924';
  }

  private parseInput() {
    return this.input.split('\n').map(x => x.trim())
  }

  private setupBingoBoards(input: string[]): Board[] {
    const board_count = (input.length - 1) / 6

    let boards = []
    let bingoBoards: Board[] = []

    for (let i = 0; i < board_count; i++) {
      boards[i] = []
      for (let j = 0; j < 5; j++) {
        const board = input[i * 6 + j + 2].split(' ').filter(x => x !== '').map(x => +x)
        boards[i].push(board)
      }
      bingoBoards.push(new Board(i + 1, boards[i]))
    }

    return bingoBoards
  }

  private play(numbers: number[], boards: Board[]) {
    for (let n of numbers) {
      for (let board of boards) {
        board.checkNumber(n)
        if (board.checkWin()) {
          return { board, n }
        }
      }
    }
  }

  private findLastBoardToWin(numbers: number[], boards: Board[]) {
    for (const n of numbers) {
      for (const board of boards) {
        board.checkNumber(n)
        if (!board.done && board.checkWin()) {
          board.done = true
          if (boards.every(b => b.done)) {
            return { board, n }
          }
        }
      }
    }
  }
}

class Board {
  public id: number
  public tiles: BingoNumber[][] = []
  public done: boolean

  constructor(id: number, arr: number[][]) {
    this.id = id
    this.parseTiles(arr)
  }

  public checkNumber(n: number) {
    for (const row of this.tiles) {
      for (const bingoNumber of row) {
        if (bingoNumber.value == n) bingoNumber.checked = true
      }
    }
  }

  public checkWin(): boolean {
    for (const row of this.tiles) {
      if (row.every(x => x.checked == true)) return true
    }

    for (let i = 0; i < 5; i++) {
      if (this.tiles[0][i].checked
        && this.tiles[1][i].checked
        && this.tiles[2][i].checked
        && this.tiles[3][i].checked
        && this.tiles[4][i].checked)
        return true
    }

    return false
  }

  public getScore() {
    let n = 0
    for (const row of this.tiles) {
      for (const bingo of row) {
        if (!bingo.checked) n += bingo.value
      }
    }

    return n
  }

  private parseTiles(arr: number[][]) {
    for (let i = 0; i < arr.length; i++) {
      this.tiles[i] = []
      for (let j = 0; j < arr[0].length; j++) {
        this.tiles[i].push({ value: arr[i][j], checked: false })
      }
    }
  }
}

interface BingoNumber {
  value: number
  checked: boolean
}

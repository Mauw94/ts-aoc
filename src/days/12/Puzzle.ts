import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  graph: Map<string, string[]>

  public solveFirst(): string {

    this.graph = this.createCaveSystem()
    const paths: string[] = []
    this.depthFirstSearch("start", [], paths)

    return paths.length.toString();
  }

  public solveSecond(): string {
    this.graph = this.createCaveSystem()
    const paths: string[] = []
    this.depthFirstSearch2("start", [], false, paths)

    return paths.length.toString();
  }

  depthFirstSearch(node: string, visited: string[], paths: string[]) {
    visited.push(node)
    if (node === "end") {
      console.log(visited.join(`,`))
      paths.push(visited.join(`,`))
      return
    }
    for (const neighbour of this.graph.get(node)) {
      if (this.isSmallCave(neighbour) && visited.includes(neighbour)) {
        continue
      }
      this.depthFirstSearch(neighbour, [...visited], paths)
    }
  }

  depthFirstSearch2(node: string, visited: string[], visitedTwice: boolean, paths: string[]) {
    visited.push(node)
    if (node === "end") {
      console.log(visited.join(`,`))
      paths.push(visited.join(`,`))
      return
    }
    for (const neighbours of this.graph.get(node)) {
      if (neighbours === "start") {
        continue
      }
      if (this.isSmallCave(neighbours) && visited.includes(neighbours)) {
        if (visitedTwice) {
          continue
        }
        if (visited.filter((x) => x === neighbours).length >= 2) {
          continue
        }
        this.depthFirstSearch2(neighbours, [...visited], true, paths)
      } else {
        this.depthFirstSearch2(neighbours, [...visited], visitedTwice, paths)
      }
    }
  }

  isSmallCave(c: string) {
    return /[a-z]/.test(c)
  }

  createCaveSystem() {
    const graph: Map<string, string[]> = new Map<string, string[]>()
    this.input.replace(/\r/g, "")
      .split("\n")
      .filter(Boolean)
      .map((x) => {
        const [from, to] = x.split("-")
        if (!graph.has(from)) {
          graph.set(from, [])
        }
        if (!graph.has(to)) {
          graph.set(to, [])
        }
        graph.get(from).push(to)
        graph.get(to).push(from)
      })

    return graph
  }



  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

}



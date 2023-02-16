import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  graph: Map<string, string[]>

  public solveFirst(): string {

    this.graph = this.createCaveSystem()
    const paths: string[] = []
    this.depthFirstSearch("start", [], paths)

    return paths.length.toString();
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
}



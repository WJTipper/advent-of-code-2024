import { readFileSync } from "node:fs";
const input = readFileSync("input/day-10.txt", "utf-8").split("\r\n")

// list all trailheads
let paths: string[] = []
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] == "0") {
            paths.push(j + "," + i)
        }
    }
}
// list all valid paths
for (let i = 0; i < 9; i++) {
    const validPaths: string[] = []
    for (let path of paths) {
        const pathArr = path.split("-").map((step) => step.split(","))
        const lastStepX = parseInt(pathArr[pathArr.length - 1][0])
        const lastStepY = parseInt(pathArr[pathArr.length - 1][1])
        for (let [x,y] of [[lastStepX - 1, lastStepY], [lastStepX + 1, lastStepY], [lastStepX, lastStepY - 1], [lastStepX, lastStepY + 1]]) {
            if (
                x >= 0 && x < input[0].length &&
                y >= 0 && y < input.length &&
                input[y][x] == (i+1).toString()
            ) {
               const pathWithNextStep = path.slice() + "-" + x + "," + y
               validPaths.push(pathWithNextStep)
            }
        }
    }
    paths = [...validPaths]
}
// calculate sum of trailhead scores (by counting distinct trailhead/summit pairs)
const trailheadSummitPairs: string[] = []
for (let path of paths) {
    const pathArr = path.split("-")
    const trailhead = pathArr[0]
    const summit = pathArr[pathArr.length - 1]
    trailheadSummitPairs.push(trailhead + "-" + summit)
}

console.log("Part 1 result: " + Array.from(new Set(trailheadSummitPairs)).length)
console.log("Part 2 result: " + paths.length)

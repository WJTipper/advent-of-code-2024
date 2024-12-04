import { readFileSync } from "node:fs";
const input = readFileSync("input/day-04.txt", "utf-8").split("\r\n")

// Part 1
let total1 = 0
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] == "X") {
            for (let horizonalStep of [-1,0,1]) {
                for (let verticalStep of [-1,0,1]) {
                    try {
                        const word = input[i][j]
                            + input[i + verticalStep][j + horizonalStep]
                            + input[i + 2 * verticalStep][j + 2 * horizonalStep]
                            + input[i + 3 * verticalStep][j + 3 * horizonalStep]
                        if (word == "XMAS") {
                            total1++
                        }
                    } catch {
                        continue
                    }
                }
            }
        }
    }
}

console.log("Part 1 result: " + total1)

// Part 2
let total2 = 0
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] == "A") {
            try {
                const cornersArr = [input[i-1][j-1], input[i-1][j+1], input[i+1][j-1], input[i+1][j+1]]
                const cornersStr = cornersArr.sort().join()
                if (cornersStr == "M,M,S,S" && input[i-1][j-1] != input[i+1][j+1]) {
                    total2++
                }
            } catch {
                continue
            }
        }
    }
}

console.log("Part 2 result: " + total2)
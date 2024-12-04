import { readFileSync } from "node:fs";
const input = readFileSync("input/day-01.txt", "utf-8").split("\r\n");

// Part 1
const leftColumn: number[] = []
const rightColumn: number[] = []
let result1 = 0

for (let item of input) {
    const splitItem = item.split("   ")
    leftColumn.push(parseInt(splitItem[0]))
    rightColumn.push(parseInt(splitItem[1]))
}
leftColumn.sort((a: number, b: number) => a - b)
rightColumn.sort((a: number, b: number) => a - b)
for (let i = 0; i < leftColumn.length; i++) {
    result1 += Math.abs(leftColumn[i] - rightColumn[i])
}

console.log("Part 1 result: " + result1)

// Part 2
let result2 = 0

for (let i = 0; i < leftColumn.length; i++) {
    const filteredRightCol = rightColumn.filter(item => item == leftColumn[i])
    result2 += leftColumn[i] * filteredRightCol.length
}

console.log("Part 2 result: " + result2)

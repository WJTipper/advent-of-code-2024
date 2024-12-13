import { readFileSync } from "node:fs";
const input = readFileSync("input/day-11.txt", "utf-8").split(" ")

let partOneAnswer = 0
let partTwoAnswer = 0

for (let i = 0; i < input.length; i++) {
    const stones = [input[i]]
    for (let blinks = 0; blinks < 75; blinks++) {
        for (let index in stones) {
            if (stones[index] == "0") {
                stones[index] = "1"
            } else if (stones[index].length %2 == 0) {
                stones[index] = stones[index].slice(0, stones[index].length / 2)
                    + "/"
                    + stones[index].slice(stones[index].length / 2)
            } else {
                stones[index] = (parseInt(stones[index]) * 2024).toString()
            }
        }
        for (let stone of stones) {
            if (stone.indexOf("/") > -1) {
                const leftStone = (parseInt(stone.split("/")[0])).toString()
                const rightStone = (parseInt(stone.split("/")[1])).toString()
                stones.splice(stones.indexOf(stone), 1, leftStone, rightStone)
            }
        }
        if (blinks == 24) {
            partOneAnswer += stones.length
        }
    }
    partTwoAnswer += stones.length
}

/*
Original solution: outer loop over blinks, inner loop over each stone
Refactored solution: swap loops, totalling each stone's eventual length individually
    This is much faster but not fast enough for 75 blinks (part 2)
Proposed part 2 solution: a recursive solution is needed to compute part 2 efficiently
*/
console.log("Part 1 result: " + partOneAnswer)
console.log("Part 2 result: " + partTwoAnswer)
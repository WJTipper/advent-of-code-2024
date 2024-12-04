import { readFileSync } from "node:fs";
const input = readFileSync("input/day-03.txt", "utf-8").replaceAll("\r\n","")

// Part 1
const sumValidMuls = (input: string) => {
    let total = 0
    const validInstructions = input.matchAll(/mul\(\d+,\d+\)/g)
    for (let instruction of validInstructions) {
        const nums = instruction[0].slice(4,-1).split(",")
        total += parseInt(nums[0]) * parseInt(nums[1])
    }
    return total
}

console.log("Part 1 result: " + sumValidMuls(input))

// Part 2
let total = 0
const inputArray = input.split("do()")
for (let instructionGroup of inputArray) {
    total += sumValidMuls(instructionGroup.split("don't()")[0])
}

console.log("Part 2 result: " + total)
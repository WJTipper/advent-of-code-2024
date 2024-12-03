import { readFileSync } from 'node:fs';
const input = readFileSync('input/day-03.txt', 'utf-8').replaceAll("\r\n","")

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
/*
add 'do()' to the start and 'don't()' to the end of the input
matchall on do()...don't()
    loop over each of those, do the same as before
*/
// input = "do()" + input + "don't()"
let total = 0
// console.log(input.slice(0,20))
// console.log(input.slice(-30))

// const validInstructionGroups = input.matchAll(/do\(\).*don't\(\)/g)

// for (let instructionGroup of validInstructionGroups) {
//     console.log(instructionGroup)
//     total += sumValidMuls(instructionGroup[0])
// }

// split on do, trim after don't

// console.log(input.split("do()")[5])
// console.log("---")
// console.log(input.split("do()")[5].split("don't()")[0])

const inputArray = input.split("do()")
for (let instructionGroup of inputArray) {
    total += sumValidMuls(instructionGroup.split("don't()")[0])
}

console.log("Part 2 result: " + total)
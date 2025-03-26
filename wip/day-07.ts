import { readFileSync } from "node:fs";
const input = readFileSync("../input/day-07.txt", "utf-8")
    .split("\r\n")
    .map((line) => line.split(": "))
    .map(([result, inputs]) => [result, ...inputs.split(" ")])

// Part 1
let total = 0
/*
for each equation
    if all sum > result || all product < result then continue

    for products = 0,...,inputs.length-1
        create array w/* & + (0p/5s, 1p/4s, ..., 5p/0s)
        create permutations of that array
        for each permutation of prods/sums
            calc result
                loop over array, get operator from p/s array
            if result = testVal then total += testVal

alt implementation: insert + & * into input array elems (would need strings not numbers) then eval
split out eval (given input array & operator array) into separate fn
*/

const evaluateEquation = (inputs: string[], operators: string[]): string => {
    if (operators.length != inputs.length - 1) {
        throw new Error("Operators array has incorrect length")
    }
    let result = parseInt(inputs[0])
    for (let i = 0; i < operators.length; i++) {
        result = eval(result.toString() + operators[i] + inputs[i + 1])
    }
    return result.toString()
}

const permutate = (array: string[]): string[][] => {
    const permutations: string[] = []
    const str = array.join("")
    
    // need to refactor this, 39916800 perms is too many
    // could work with strings only, then only push if not already in the result array
    // try using Array.from(new Set(array)) to remove duplicates

    // permutate should push strings to permutations array
    const permutate = (str: string, remainingLength: number = str.length) => {
        if (remainingLength == 1 && !permutations.includes(str)) {
            // console.log("push " + array)
            permutations.push(str)
        } else {
            for (let i = 0; i < remainingLength; i++) {
                // console.log("permutating, i=" + i + ", remlen=" + remainingLength)
                permutate(str, remainingLength - 1)
                if (remainingLength % 2 === 0) {
                    const temp = array[i];
                    array[i] = array[remainingLength - 1];
                    array[remainingLength - 1] = temp;
                } else {
                    const temp = array[0];
                    array[0] = array[remainingLength - 1];
                    array[remainingLength - 1] = temp;
                }
            }
        }
    }
    permutate(str)
    console.log(permutations.length)
    // for (let i = permutations.length - 1; i > 0; i--) {
    //     if (permutations.slice(0,i).includes(permutations[i])) {
    //         permutations.splice(i,1)
    //     }
    // }
    return permutations.map((str: string) => str.split(""))
}

// console.log(permutate(["1", "2", "1", "2","1", "2","1", "2"]))
// console.log(permutate(["+", "+", "+", "+",
//     "+", "+", "+", "+",
//     "+", "+", "+"]))

const shortInput = input.slice(4,5)
console.time("timer")
for (let equation of shortInput) {
    console.log("new equation")
    const testVal = equation[0]
    const inputList = equation.slice(1)
    let solutionFound = false
    // console.log("testVal: " + testVal + ", inputList: " + inputList)
    const allSum = Array(inputList.length - 1).fill("+")
    const allProduct = Array(inputList.length - 1).fill("*")
    if (
        parseInt(evaluateEquation(inputList, allSum)) > parseInt(testVal) ||
        parseInt(evaluateEquation(inputList, allProduct)) < parseInt(testVal)
    ) {
        console.log("skipping")
        continue
    }

    for (let i = 0; i < inputList.length; i++) {
        console.log("new operator set, i=" + i)
        const operators = [...Array(inputList.length - i - 1).fill("+"), ...Array(i).fill("*")]
        console.log("operators:")
        console.log(operators)
        const operatorPermutations = permutate(operators)
        console.log("permutations:")
        console.log(operatorPermutations)
        for (let operatorList of operatorPermutations) {
            console.log("new operator combination, i=" + i)
            const result = evaluateEquation(inputList, operatorList)
            if (result == testVal) {
                console.log("solution found!")
                solutionFound = true
                total += parseInt(testVal)
                break
            }
        }
        if (solutionFound) {
            break
        }
    }
}
console.timeEnd("timer")
console.log("Part 1 result: " + total)

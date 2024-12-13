import { readFileSync } from "node:fs";
const input = readFileSync("input/day-13.txt", "utf-8").split("\r\n")

// Part 1
let totalFewestTokens1 = 0

for (let i = 0; i < 320; i++) {
    const buttonA = input[4 * i].split(":")[1].trim().split(", ").map((str) => str.split("+"))
    const moveXusingA = parseInt(buttonA[0][1])
    const moveYusingA = parseInt(buttonA[1][1])

    const buttonB = input[4 * i + 1].split(":")[1].trim().split(", ").map((str) => str.split("+"))
    const moveXusingB = parseInt(buttonB[0][1])
    const moveYusingB = parseInt(buttonB[1][1])

    const prize = input[4 * i + 2].split(":")[1].trim().split(", ").map((str) => str.split("="))
    const prizeX = parseInt(prize[0][1])
    const prizeY = parseInt(prize[1][1])

    let fewestTokensToWin = 400
    let prizeWon = false

    for (let buttonAPresses = 0; buttonAPresses <= 100; buttonAPresses++) {
        const xDistance = buttonAPresses * moveXusingA
        const yDistance = buttonAPresses * moveYusingA
        if (
            (prizeX - xDistance) % moveXusingB == 0 &&
            (prizeY - yDistance) % moveYusingB == 0 &&
            (prizeX - xDistance) / moveXusingB <= 100 &&
            (prizeY - yDistance) / moveYusingB <= 100 &&
            (prizeX - xDistance) / moveXusingB == (prizeY - yDistance) / moveYusingB
        ) {
            prizeWon = true
            const buttonBPresses = (prizeX - xDistance) / moveXusingB
            const tokensToWin = 3 * buttonAPresses + buttonBPresses
            if (tokensToWin < fewestTokensToWin) {
                fewestTokensToWin = tokensToWin
            }
        }
    }

    if (prizeWon) {
        totalFewestTokens1 += fewestTokensToWin
    }
}

console.log("Part 1 result: " + totalFewestTokens1)

// Part 2
let totalFewestTokens2 = 0

for (let i = 0; i < 320; i++) {
    const buttonA = input[4 * i].split(":")[1].trim().split(", ").map((str) => str.split("+"))
    const moveXusingA = parseInt(buttonA[0][1])
    const moveYusingA = parseInt(buttonA[1][1])

    const buttonB = input[4 * i + 1].split(":")[1].trim().split(", ").map((str) => str.split("+"))
    const moveXusingB = parseInt(buttonB[0][1])
    const moveYusingB = parseInt(buttonB[1][1])

    const prize = input[4 * i + 2].split(":")[1].trim().split(", ").map((str) => str.split("="))
    const prizeX = parseInt(prize[0][1]) + 10000000000000
    const prizeY = parseInt(prize[1][1]) + 10000000000000

    const maxButtonAPresses = Math.min(Math.floor(prizeX / moveXusingA), Math.floor(prizeY / moveYusingA))
    let fewestTokensToWin = 40000000000000
    let prizeWon = false

    for (let buttonAPresses = 0; buttonAPresses <= maxButtonAPresses; buttonAPresses++) {
        const xDistance = buttonAPresses * moveXusingA
        const yDistance = buttonAPresses * moveYusingA
        if (
            (prizeX - xDistance) % moveXusingB == 0 &&
            (prizeY - yDistance) % moveYusingB == 0 &&
            (prizeX - xDistance) / moveXusingB == (prizeY - yDistance) / moveYusingB
        ) {
            prizeWon = true
            const buttonBPresses = (prizeX - xDistance) / moveXusingB
            const tokensToWin = 3 * buttonAPresses + buttonBPresses
            if (tokensToWin < fewestTokensToWin) {
                fewestTokensToWin = tokensToWin
            }
        }
    }

    if (prizeWon) {
        totalFewestTokens2 += fewestTokensToWin
    }
}

/*
Current solution is too slow to run, need to exclude some cases to increase efficiency
*/
console.log("Part 2 result: " + totalFewestTokens2)
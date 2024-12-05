import { readFileSync } from "node:fs";
const input = readFileSync("input/day-05.txt", "utf-8").split("\r\n")
const rules = input.slice(0,1176).map((rule) => rule.split("|"))
const manuals = input.slice(1177).map((manual) => manual.split(","))

// Part 1
let total1 = 0

const isCorrectlyOrdered = (manual: string[], ruleSet: string[][]) => {
    for (let rule of ruleSet) {
        if (
            manual.indexOf(rule[0]) < 0 ||
            manual.indexOf(rule[1]) < 0 ||
            manual.indexOf(rule[0]) < manual.indexOf(rule[1])
        ) {
            continue
        } else {
            return false
        }
    }
    return true
}

for (let manual of manuals) {
    if (isCorrectlyOrdered(manual, rules)) {
        total1 += parseInt(manual[(manual.length - 1) / 2])
    }
}

console.log("Part 1 result: " + total1)

// Part 2
let total2 = 0

const orderCorrectly = (manual: string[], ruleSet: string[][]) => {
    let hasBeenReordered = true
    while (hasBeenReordered) {
        hasBeenReordered = false
        for (let rule of ruleSet) {
            if (
                manual.indexOf(rule[0]) > manual.indexOf(rule[1]) &&
                manual.indexOf(rule[0]) > -1 &&
                manual.indexOf(rule[1]) > -1
            ) {
                manual.splice(manual.indexOf(rule[0]), 1)
                manual.splice(manual.indexOf(rule[1]), 0, rule[0])
                hasBeenReordered = true
            }
        }
    }
    return manual
}

for (let manual of manuals) {
    if (!isCorrectlyOrdered(manual, rules)) {
        const correctedManual = orderCorrectly(manual, rules)
        total2 += parseInt(correctedManual[(correctedManual.length - 1) / 2])
    }
}

console.log("Part 2 result: " + total2)
import { readFileSync } from "node:fs";
const input = readFileSync("../input/day-12.txt", "utf-8").split("\r\n")

const shortInput = input.slice(0,10).map((row) => row.slice(0,20))
console.log(shortInput)

// Part 1
/*
marked/covered coords = []
loop over each plot
    if plot not already covered
        find boundary & add all plots touched to the covered coords list:
            repeatedly step up/down/left/right (may need recursion for this part?),
                area++
                if new plot is not same letter then current plot is boundary, perimeter++
                else add new plot to covered coords list
*/
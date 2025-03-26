import { readFileSync } from "node:fs";
let diskMap = readFileSync("../input/day-09.txt", "utf-8")

// Part 1
// console.log(input.length)
let shortdiskMap1 = diskMap.slice(0,3)
// console.log(shortInput1)
let shortdiskMap2 = diskMap.slice(0,5)
// console.log("start input: " + shortdiskMap2)
let shortdiskMap3 = diskMap.slice(0,11)
console.log("start input: " + shortdiskMap3)

let total = 0
let position = 0
let directionIsForward = true
let forwardFileId: number = 0
let backwardFileId: number = (shortdiskMap3.length - 1) / 2
console.log("start IDs: " + forwardFileId + "-" + backwardFileId)

/*
check if current implementation handles files/gaps of size 0,
might need to check for 0 at either end before if/else
and remove chars accordingly
NB no zero-sized files, 1010 zero-sized gaps
    -> shouldn't be an issue going forward
    -> add initial check to backward block

still need to work on ending condition & processing last 3-4 chars
need to check that ID tracking is correct, might be off by 1
*/

// let zeroSizeFiles = 0
// let zeroSizeGaps = 0
// for (let i = 0; i < diskMap.length; i++) {
//     if (i%2==0 && diskMap[i]=="0") zeroSizeFiles++
//     if (i%2==1 && diskMap[i]=="0") zeroSizeGaps++
// }
// console.log("files: " + zeroSizeFiles + ", gaps: " + zeroSizeGaps)

while (forwardFileId < backwardFileId + 1) {
    console.log("position=" + position + ", forwardID=" + forwardFileId + ", backwardID=" + backwardFileId + ", forward?=" + directionIsForward)
    console.log("diskmap: " + shortdiskMap3)
    if (directionIsForward) {
        console.log("forward!")
        console.log("total=" + total + ", checksum=" + position * forwardFileId)
        total += position * forwardFileId
        console.log("diskmap before: " + shortdiskMap3)
        shortdiskMap3 = (parseInt(shortdiskMap3[0]) - 1).toString() + shortdiskMap3.slice(1)
        console.log("diskmap after: " + shortdiskMap3)
        if (shortdiskMap3[0] == "0") {
            console.log("file size zero, axing first char")
            console.log("diskmap before: " + shortdiskMap3)
            shortdiskMap3 = shortdiskMap3.slice(1)
            console.log("diskmap after: " + shortdiskMap3)
            forwardFileId++
            directionIsForward = false
        }
    } else if (shortdiskMap3[0] == "0") {
        // case where first char is a 0-size gap
        // need to remove and resume in forward direction
        console.log("gap size zero, axing first char")
        console.log("diskmap before: " + shortdiskMap3)
        shortdiskMap3 = shortdiskMap3.slice(1)
        console.log("diskmap after: " + shortdiskMap3)
        directionIsForward = true
    } else {
        console.log("backward!")
        console.log("total=" + total + ", checksum=" + position * backwardFileId)
        total += position * backwardFileId
        console.log("diskmap before: " + shortdiskMap3)
        shortdiskMap3 = (parseInt(shortdiskMap3[0]) - 1).toString()
            + shortdiskMap3.slice(1,-1)
            + (parseInt(shortdiskMap3[shortdiskMap3.length - 1]) - 1).toString()
        console.log("diskmap after: " + shortdiskMap3)
        if (shortdiskMap3[0] == "0") {
            console.log("gap size zero, axing first char")
            console.log("diskmap before: " + shortdiskMap3)
            shortdiskMap3 = shortdiskMap3.slice(1)
            console.log("diskmap after: " + shortdiskMap3)
            forwardFileId++
            directionIsForward = true
        }
        if (shortdiskMap3[shortdiskMap3.length - 1] == "0") {
            console.log("file size zero, axing last char (file) & penultimate char (gap)")
            console.log("diskmap before: " + shortdiskMap3)
            shortdiskMap3 = shortdiskMap3.slice(0, -2)
            console.log("diskmap after: " + shortdiskMap3)
            backwardFileId--
        }
    }
    position++
}
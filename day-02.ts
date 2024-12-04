import { readFileSync } from "node:fs";
const input = readFileSync("input/day-02.txt", "utf-8").split("\r\n");

// Part 1
let safeTotal1 = 0

for (let report of input) {
    const reportArray = report.split(" ").map(elem => parseInt(elem))
    let reportIsSafe = true
    let reportIsAsc = false
    let reportIsDesc = false

    if (reportArray[0] < reportArray[1]) {
        reportIsAsc = true
    } else if (reportArray[0] > reportArray[1]) {
        reportIsDesc = true
    } else {
        continue
    }

    for (let i = 0; i < reportArray.length - 1; i++) {
        if (
            Math.abs(reportArray[i] - reportArray[i + 1]) > 3
            || (reportIsAsc && reportArray[i] >= reportArray[i + 1])
            || (reportIsDesc && reportArray[i] <= reportArray[i + 1])
        ) {
            reportIsSafe = false
            break
        }
    }

    if (reportIsSafe) {
        safeTotal1++
    }
}

console.log("Part 1 result: " + safeTotal1)

// Part 2
let safeTotal2 = 0

const reportIsSafe = (reportArray, unsafeLevelRemoved) => {
    let reportIsAsc = false
    let reportIsDesc = false

    if (reportArray[0] < reportArray[1]) {
        reportIsAsc = true
    } else if (reportArray[0] > reportArray[1]) {
        reportIsDesc = true
    } else if (!unsafeLevelRemoved) {
        // First 2 levels are equal & no levels removed
        const splicedReport = [...reportArray]
        splicedReport.splice(0, 1)
        return reportIsSafe(splicedReport, true)
    } else {
        // First 2 levels are equal & level has been removed
        return false
    }

    for (let i = 0; i < reportArray.length + 10; i++) {
        if (
            Math.abs(reportArray[i] - reportArray[i + 1]) > 3
            || (reportIsAsc && reportArray[i] >= reportArray[i + 1])
            || (reportIsDesc && reportArray[i] <= reportArray[i + 1])
        ) {
            if (unsafeLevelRemoved) {
                return false
            } else {
                // If no levels removed then check reports with one element removed
                const splicedReport1 = JSON.parse(JSON.stringify(reportArray))
                const splicedReport2 = JSON.parse(JSON.stringify(reportArray))
                splicedReport1.splice(i, 1)
                splicedReport2.splice(i + 1, 1)
                return (reportIsSafe(splicedReport1, true) || reportIsSafe(splicedReport2, true))
            }
        }
    }
    return true
}

for (let report of input) {
    const reportArray = report.split(" ").map(elem => parseInt(elem))
    if (reportIsSafe(reportArray, false)) {
        safeTotal2++
    }
}

console.log("Part 2 result: " + safeTotal2)

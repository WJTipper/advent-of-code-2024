import { readFileSync } from "node:fs";
const input = readFileSync("input/day-08.txt", "utf-8").split("\r\n")

// Part 1
const frequencies = Array.from(new Set(input.join("").split("").filter((elem) => (elem != "."))))
const antinodeCoords1: string[] = []

for (let frequency of frequencies) {
    const antennaCoords: string[] = []
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] == frequency) {
                antennaCoords.push(j + "," + i)
            }
        }
    }

    for (let i = 0; i < antennaCoords.length - 1; i++) {
        for (let j = i + 1; j < antennaCoords.length; j++) {
            const antenna1 = antennaCoords[i].split(",").map((coord) => parseInt(coord))
            const antenna2 = antennaCoords[j].split(",").map((coord) => parseInt(coord))
            const antinodes = [
                [antenna1[0] - (antenna2[0] - antenna1[0]), antenna1[1] - (antenna2[1] - antenna1[1])],
                [antenna2[0] + (antenna2[0] - antenna1[0]), antenna2[1] + (antenna2[1] - antenna1[1])]
            ]
            for (let antinode of antinodes) {
                if (
                    antinode[0] >=0 && antinode[0] < input[0].length &&
                    antinode[1] >=0 && antinode[1] < input.length &&
                    !antinodeCoords1.includes(antinode.join(","))
                ) {
                    antinodeCoords1.push(antinode.join(","))
                }
            }
        }
    }
}

console.log("Part 1 result: " + new Set(antinodeCoords1).size)

// Part 2
const antinodeCoords2: string[] = []

const hcf = (num1: number, num2: number) => {
    if (num2 === 0) {
        return num1;
    }
    return hcf(num2, num1 % num2);
}

for (let frequency of frequencies) {
    const antennaCoords: string[] = []
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] == frequency) {
                antennaCoords.push(j + "," + i)
            }
        }
    }

    for (let i = 0; i < antennaCoords.length - 1; i++) {
        for (let j = i + 1; j < antennaCoords.length; j++) {
            const antenna1 = antennaCoords[i].split(",").map((coord) => parseInt(coord))
            const antenna2 = antennaCoords[j].split(",").map((coord) => parseInt(coord))
            let horizonalStep = antenna2[0] - antenna1[0]
            let verticalStep = antenna2[1] - antenna1[1]
            if (Math.abs(hcf(horizonalStep, verticalStep)) > 1) {
                horizonalStep /= Math.abs(hcf(horizonalStep, verticalStep))
                verticalStep /= Math.abs(hcf(horizonalStep, verticalStep))
            }

            let insideMapBounds = true
            let stepCount = 0
            while (insideMapBounds) {
                let coords = [antenna1[0] - (horizonalStep * stepCount), antenna1[1] - (verticalStep * stepCount)]
                stepCount++
                if (
                    coords[0] >=0 && coords[0] < input[0].length &&
                    coords[1] >=0 && coords[1] < input.length
                ) {
                    if (!antinodeCoords2.includes(coords.join(","))) {
                        antinodeCoords2.push(coords.join(","))
                    }
                } else {
                    insideMapBounds = false
                }
            }

            insideMapBounds = true
            stepCount = 0
            while (insideMapBounds) {
                let coords = [antenna2[0] + (horizonalStep * stepCount), antenna2[1] + (verticalStep * stepCount)]
                stepCount++
                if (
                    coords[0] >=0 && coords[0] < input[0].length &&
                    coords[1] >=0 && coords[1] < input.length
                ) {
                    if (!antinodeCoords2.includes(coords.join(","))) {
                        antinodeCoords2.push(coords.join(","))
                    }
                } else {
                    insideMapBounds = false
                }
            }
        }
    }
}

console.log("Part 2 result: " + new Set(antinodeCoords2).size)

import { readFileSync } from "node:fs";
const input = readFileSync("input/day-06.txt", "utf-8").split("\r\n")

// Part 1
type Direction = "up"|"right"|"down"|"left"
type Position = [number, number]

const step = {
    up: {x: 0, y: -1},
    right: {x: 1, y: 0},
    down: {x: 0, y: 1},
    left: {x: -1, y: 0},
}

const turnRight = (currentDirection: Direction): Direction => {
    switch (currentDirection) {
        case "up":
            return "right"
        case "right":
            return "down"
        case "down":
            return "left"
        case "left":
            return "up"
    }
}

let positionsVisited = 0
const map = [...input]

let startPosition: Position = [-1, -1]
for (let i = 0; i < map.length; i++) {
    if (map[i].indexOf("^") > -1) {
        startPosition = [map[i].indexOf("^"), i]
    }
}

let currentPosition: Position = startPosition
let nextPosition: Position = [-1, -1]
let currentDirection: Direction = "up"
let nextStepInsideMap: boolean = true

while (nextStepInsideMap) {
    map[currentPosition[1]] = map[currentPosition[1]].slice(0, currentPosition[0])
        + "X"
        + map[currentPosition[1]].slice(currentPosition[0] + 1)

    try {
        nextPosition = [
            currentPosition[0] + step[currentDirection]["x"],
            currentPosition[1] + step[currentDirection]["y"]
        ]
        while(map[nextPosition[1]][nextPosition[0]] == "#") {
            currentDirection = turnRight(currentDirection)
            nextPosition = [
                currentPosition[0] + step[currentDirection]["x"],
                currentPosition[1] + step[currentDirection]["y"]
            ]
        }
        if (map[nextPosition[1]][nextPosition[0]] == undefined) {
            nextStepInsideMap = false
        }
        currentPosition = nextPosition
    } catch {
        nextStepInsideMap = false
    }
}

for (let i = 0; i < map.length; i++) {
    positionsVisited += map[i].replaceAll(/[^X]/g, "").length
}

console.log("Part 1 result: " + positionsVisited)

// Part 2
let pathsWithLoops = 0

let obstaclePositions: Position[] = []
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == "X") {
            obstaclePositions.push([j, i])
        }
    }
}

for (let obstaclePosition of obstaclePositions) {
    const map = [...input]
    map[obstaclePosition[1]] = map[obstaclePosition[1]].slice(0, obstaclePosition[0])
        + "#"
        + map[obstaclePosition[1]].slice(obstaclePosition[0] + 1)

    let currentPosition: Position = startPosition
    let nextPosition: Position = [-1, -1]
    let currentDirection: Direction = "up"
    let nextStepInsideMap: boolean = true
    const previousSteps: string[] = []

    while (nextStepInsideMap) {
        if (previousSteps.indexOf([...currentPosition, currentDirection].join("-")) > -1) {
            pathsWithLoops++
            break
        }
        previousSteps.push([...currentPosition, currentDirection].join("-"))

        try {
            nextPosition = [
                currentPosition[0] + step[currentDirection]["x"],
                currentPosition[1] + step[currentDirection]["y"]
            ]
            while(map[nextPosition[1]][nextPosition[0]] == "#") {
                currentDirection = turnRight(currentDirection)
                nextPosition = [
                    currentPosition[0] + step[currentDirection]["x"],
                    currentPosition[1] + step[currentDirection]["y"]
                ]
            }
            if (map[nextPosition[1]][nextPosition[0]] == undefined) {
                nextStepInsideMap = false
            }
            currentPosition = nextPosition
        } catch {
            nextStepInsideMap = false
        }
    }
}

console.log("Part 2 result: " + pathsWithLoops)

/*
Current solution for part 2 takes ~2 minutes to run.

Possible refinement to increase performance:
- Create a list of previous steps across all maps that do not involve the added obstacle (including part 1)
- If one of these locations is encountered in the same direction,
    - skip ahead along that list of previous steps, until
        - the additional obstacle in the current scenario is encountered
            - at which point normal process is resumed
        - or the path ends with the same result (i.e. loop/no loop)

Uncertain if searching this list(s) of previous steps at every location would be faster than current solution.
*/
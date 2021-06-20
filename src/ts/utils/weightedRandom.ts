import randBetween from './randBetween'

export default function weightedRandom(weights: number[]) {
    let total = 0
    for(const weight of weights) {
        total += weight
    }

    const rand = randBetween(1, total)
    let index = 0
    let runningTotal = 0
    for(const weight of weights) {
        runningTotal += weight
        if(rand <= runningTotal) {
            return index
        }

        index++
    }
}
import Player from 'src/model/player';
import regionsJson from '../../data/regions.json'
import usernamesJson from '../../data/usernames.json'
import randBetween from '../utils/randBetween';
import weightedRandom from '../utils/weightedRandom';


export default function genPlayer() {
    let weights : number[] = []
    // Country
    for(const country of regionsJson.countries) {
        weights.push(country.popularity)
    }

    const country = weightedRandom(weights) as number

    // First name
    let names = []
    weights = []
    const firsts = regionsJson.countries[country].firstNames as unknown as { [index: string] : number}
    for(const name in regionsJson.countries[country].firstNames) {
        if(regionsJson.countries[country].firstNames.hasOwnProperty(name)) {
            names.push(name)
            weights.push(firsts[name])
        }
    }

    const first = names[weightedRandom(weights) as number]

    // Last name
    names = []
    weights = []
    const lasts = regionsJson.countries[country].lastNames as unknown as { [index: string] : number}
    for(const name in regionsJson.countries[country].lastNames) {
        if(regionsJson.countries[country].lastNames.hasOwnProperty(name)) {
            names.push(name)
            weights.push(lasts[name])
        }
    }

    const last = names[weightedRandom(weights) as number]

    // Username
    const username = usernamesJson.names[randBetween(0, usernamesJson.names.length - 1)]

    // Rating
    const rating = randBetween(50, 100)

    // Potential
    const potential = rating + randBetween(0, 20)


    return new Player(first, last, username, regionsJson.countries[country].region, regionsJson.countries[country].name, rating, potential, new Date(1995, 1, 1), -1)
}
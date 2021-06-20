export default class Player {
    first: string
    last: string
    username: string
    region: string
    country: string
    rating: number
    potential: number
    dob: Date
    team: number
    id!: number

    constructor(first: string, last: string, username: string, region: string, country: string, rating: number, potential: number, dob: Date, team: number, id?: number) {
        this.first = first
        this.last = last
        this.username = username
        this.region = region
        this.country = country
        this.rating = rating
        this.potential = potential
        this.dob = dob
        this.team = team
        if(id) this.id = id
    }
}
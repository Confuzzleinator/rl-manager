export default class Team {
    name: string
    abbrev: string
    logo: string
    id!: number

    constructor(name: string, abbrev: string, logo: string, id?: number) {
        this.name = name
        this.abbrev = abbrev
        this.logo = logo
        if(id) this.id = id
    }
}
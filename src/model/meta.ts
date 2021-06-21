export default class Meta {
    team: number
    date: Date
    id!: number

    constructor(team: number, date: Date, id?: number) {
        this.team = team
        this.date = date
        if(id) this.id = id
    }
}
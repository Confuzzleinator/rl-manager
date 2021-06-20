export default class SaveGame {
    name: string
    db: string
    created: Date
    lastPlayed: Date
    id!: number

    constructor(name: string, db: string, created: Date, lastPlayed: Date, id?:number) {
        this.name = name
        this.db = db
        this.created = created
        this.lastPlayed = lastPlayed
        if(id) this.id = id
    }
}
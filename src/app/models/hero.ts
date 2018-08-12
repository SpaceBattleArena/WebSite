export class Hero {
    ID: Number;
    Faction_id: Number;
    Name: String;
    Image: String;
    private factions: any[] = [
        {ID: 1, Name: 'Neutral'},
        {ID: 2, Name: 'Federation'},
        {ID: 3, Name: 'Rebel'}
    ];

    public getFaction(): String {
        for(let i = 0; i < this.factions.length; i += 1) {
            if (this.factions[i].ID === this.Faction_id) {
                return this.factions[i].Name;
            }
        }
        return null;
    }
}
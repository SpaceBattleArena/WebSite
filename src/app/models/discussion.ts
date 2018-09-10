import {User} from './user';

export class Discussion {
    ID: number;
    Author_id: number;
    Name: string;
    Creation_date: Date;
    Tags: string;
    User: User;

    constructor(ID: number, Author_id: number, Name: string, Creation_date: Date, Tags: string) {
        this.ID = ID;
        this.Author_id = Author_id;
        this.Name = Name;
        this.Tags = Tags;
        this.Creation_date = new Date(Creation_date);
    }

    public getDate() {
        let c_date = new Date(this.Creation_date);
        return c_date.getDate().toString() +"/" + c_date.getMonth().toString() + "/" + c_date.getFullYear().toString();
    }
}
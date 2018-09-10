import {User} from './user';

export class Message {
    ID: number;
    Author_id: number;
    Forum_id: number;
    Content: Text;
    Creation_date: Date;
    Modification_date: Date;
    User: User;
}
export class Message {
    id: number;
    author_id: number;
    text: Text;
    post_date: Date;
    discussion_id: number;
    edit_date: number;
    modify_by_id: number; //user ID / If admin -> color message is red
}
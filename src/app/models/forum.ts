export class ForumObject {
  id: number;
  username: string;
  message: string;
  date: string;

  constructor(id: number, username: string, message: string, date: string) {
    this.id = id;
    this.username = username;
    this.message = message;
    this.date = date;
  }
}
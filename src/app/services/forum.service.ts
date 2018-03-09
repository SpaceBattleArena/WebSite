import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Discussion } from '../models/discussion';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable()
export class ForumService {
    private _postsURL = "http://localhost:3000/";
    private discussions : Discussion[] = JSON.parse(localStorage.getItem('discussions')) || [];
    private messages : Message[] = JSON.parse(localStorage.getItem('messages')) || [];

    constructor(private http: Http) { }

    getAllDiscussions() {
        return this.discussions;
        //return this.http.get('/api/discussions', this.jwt()).map((response: Response) => response.json());
    }

    getAllMessages() {
        return this.messages;
        //return this.http.get('/api/messages', this.jwt()).map((response: Response) => response.json());
    }

    getDiscussionById(id: number) {
        for (let i = 0; i < this.discussions.length; i += 1) {
            if (this.discussions[i].id === id) {
                return this.discussions[i];
            }
        }
        return null;
        //return this.http.get('/api/discussions/' + id, this.jwt()).map((response: Response) => response.json());
    }

    getMessageByDiscussionID(id:number) {
        let messages_list: any = [];
        for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].discussion_id == id ) {
                messages_list.push(this.messages[i]);
            }
        }
        return messages_list;
    }

    createDiscussion(newDiscussion: Discussion) {
        let duplicateDiscussion = this.discussions.filter(discussion => { return discussion.title === newDiscussion.title; }).length;
        if (duplicateDiscussion) {
            return new Error('Title "' + newDiscussion.title + '" is already taken');
        }

        newDiscussion.id = this.discussions.length + 1;
        this.discussions.push(newDiscussion);
        localStorage.setItem('discussions', JSON.stringify(this.discussions));
        return true;
        //return this.http.post('/api/discussions', discussion, this.jwt()).map((response: Response) => response.json());
    }

    createMessage(newMessage: Message) {
        newMessage.id = this.messages.length + 1;
        this.messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(this.messages));
        return true;
        //return this.http.post('/api/messages', message, this.jwt()).map((response: Response) => response.json());
    }

    updateDiscussion(discussion: Discussion) {
        for (let i: number = 0; i < this.discussions.length; i++) {
            if (this.discussions[i].id == discussion.id) {
                this.discussions[i] = discussion;
            }
        }
        localStorage.setItem('discussions', JSON.stringify(this.discussions));
        return true;
        //return this.http.put('/api/discussions/' + discussion.id, discussion, this.jwt()).map((response: Response) => response.json());
    }

    updateMessage(message: Message) {
        //return this.http.put('/api/messages/' + message.id, message, this.jwt()).map((response: Response) => response.json());
    }

    deleteDiscussion(id: number) {
        for (let i = 0; i < this.discussions.length; i++) {
            let discussion = this.discussions[i];
            if (discussion.id === id) {
                // delete user
                this.discussions.splice(i, 1);
                localStorage.setItem('discussions', JSON.stringify(this.discussions));
                break;
            }
        }
        return true;
        //return this.http.delete('/api/discussions/' + id, this.jwt()).map((response: Response) => response.json());
    }

    deleteMessage(id: number) {
        for (let i = 0; i < this.messages.length; i++) {
            let message = this.messages[i];
            if (message.id === id) {
                this.messages.splice(i, 1);
                localStorage.setItem('messages', JSON.stringify(this.messages));
                break;
            }
        }
        return true;
        //return this.http.delete('/api/messages/' + id, this.jwt()).map((response: Response) => response.json());
    }
}
import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { Discussion } from '../models/discussion';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable()
export class ForumService implements OnInit{
    private _postsURL = "http://ec2-13-59-89-177.us-east-2.compute.amazonaws.com:3000/";
    private discussions : Discussion[] = JSON.parse(localStorage.getItem('discussions')) || [];
    private messages : Message[] = JSON.parse(localStorage.getItem('messages')) || [];

    constructor(private http: Http) { }

    ngOnInit() {
        
    }

    getAllDiscussions() {
        return this.http
            .get(this._postsURL + "forum")
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    /*getAllMessages() {
        return this.messages;
        //return this.http.get('/api/messages', this.jwt()).map((response: Response) => response.json());
    }*/

    /*getDiscussionById(id: number) {
        for (let i = 0; i < this.discussions.length; i += 1) {
            if (this.discussions[i].id === id) {
                return this.discussions[i];
            }
        }
        return null;
        //return this.http.get('/api/discussions/' + id, this.jwt()).map((response: Response) => response.json());
    }*/

    getMessageByDiscussionID(id:number) {
        /*let messages_list: any = [];
        for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].discussion_id == id ) {
                messages_list.push(this.messages[i]);
            }
        }
        return messages_list;*/
        return this.http
            .get(this._postsURL + "forum/message/"+id.toString())
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    createDiscussion(newDiscussion: Discussion, content: Text, token: string) {
        let add_headers = new Headers();
        add_headers.append('Authorization', token);
        let options = new RequestOptions();
        options.headers = add_headers;
        let datas = {
            name: newDiscussion.Name,
            content: content.toString(),
            tags: newDiscussion.Tags
        };
        return this.http
            .post(this._postsURL + "forum/create", datas, options)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    createMessage(newMessage: Message, token: string) {
        let add_headers = new Headers();
        add_headers.append('Authorization', token);
        let options = new RequestOptions();
        options.headers = add_headers;
        let datas = {
            topic: newMessage.Forum_id,
            content: newMessage.Content,
        };

        /*let formData: FormData = new FormData();
        formData.append('content', newMessage.Content.toString());*/
        return this.http
            .post(this._postsURL + "forum/message/" + newMessage.Forum_id.toString() + "/message/post", datas, options)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    /*updateDiscussion(discussion: Discussion) {
        for (let i: number = 0; i < this.discussions.length; i++) {
            if (this.discussions[i].id == discussion.id) {
                this.discussions[i] = discussion;
            }
        }
        localStorage.setItem('discussions', JSON.stringify(this.discussions));
        return true;
        //return this.http.put('/api/discussions/' + discussion.id, discussion, this.jwt()).map((response: Response) => response.json());
    }*/

    /*updateMessage(message: Message) {
        //return this.http.put('/api/messages/' + message.id, message, this.jwt()).map((response: Response) => response.json());
    }*/

    deleteDiscussion(id: number) {
        /*for (let i = 0; i < this.discussions.length; i++) {
            let discussion = this.discussions[i];
            if (discussion.id === id) {
                // delete user
                this.discussions.splice(i, 1);
                localStorage.setItem('discussions', JSON.stringify(this.discussions));
                break;
            }
        }
        return true;*/
        //return this.http.delete('/api/discussions/' + id, this.jwt()).map((response: Response) => response.json());
        return this.http.delete(this._postsURL + "/" + id.toString() + "/delete")
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    deleteMessage(idTopic: number, idMessage: number) {
        /*for (let i = 0; i < this.messages.length; i++) {
            let message = this.messages[i];
            if (message.id === id) {
                this.messages.splice(i, 1);
                localStorage.setItem('messages', JSON.stringify(this.messages));
                break;
            }
        }
        return true;*/
        //return this.http.delete('/api/messages/' + id, this.jwt()).map((response: Response) => response.json());
        return this.http.delete(this._postsURL + "forum/message/" + idTopic.toString() + "/message/" + idMessage.toString() + "/delete")
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
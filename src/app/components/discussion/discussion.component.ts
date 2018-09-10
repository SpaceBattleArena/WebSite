import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Discussion } from '../../models/discussion';
import { Message } from '../../models/message';
import { User } from '../../models/user';
import { ForumService } from '../../services/forum.service';
import { UserService } from '../../services/user.service';
import { Error } from '../../models/error';

@Component({
    moduleId: module.id,
    styleUrls: [ '../../../assets/css/discussion.component.css' ],
    templateUrl: '../../templates/discussion.component.html',
    providers: [ForumService, UserService]
})

export class DiscussionComponent implements OnInit, OnDestroy {
    allDiscussions: Discussion[] = [];
    messages: Message[] = [];
    slug: number;
    private sub: any;
    discussion: Discussion = null;
    test: any = {};
    currentUser: User;
    new_message: Message = new Message();
    successMessage: boolean = true;
    errorMessage: boolean = false;
    usersList: User[] = [];
    private error: Error = null;

    constructor(private route: ActivatedRoute, private forumService: ForumService, private userService: UserService, private router:Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.initForumMessage();
    }

    private initForumMessage() {
        this.forumService.getAllDiscussions().subscribe(
            result => {
                if (result["status"] != undefined && result["status"] === "200") {
                    this.allDiscussions = result["topics"];
                    this.sub = this.route.params.subscribe(params => {
                        this.slug = params['slug'];
                        this.allDiscussions.forEach(element => {
                            if (element.ID == this.slug) {
                                this.discussion = element;
                            }
                        });
                        if (this.discussion == undefined) {
                            this.router.navigate(['forum']);
                        }
                        this.forumService.getMessageByDiscussionID(this.discussion.ID).subscribe(
                            result => {
                                if (result["status"] != undefined && result["status"] === "200") {
                                    if (result["messages"].length > 0) {
                                        for (let i = 0; i < result["messages"].length; i += 1) {
                                            let m_date = new Date(result["messages"][i]["Creation_date"]);
                                            result["messages"][i]["Creation_date"] = m_date;
                                        }
                                        this.messages = result["messages"];
                                        for (let i = 0; i < this.messages.length; i += 1) {
                                            this.getUserById(this.messages[i].Author_id, i);
                                        }
                                    } else {
                                        this.messages = null;
                                    }
                                } else {
                                    this.messages = null;
                                }
                            },
                            error => {
                                this.error = new Error("Erreur", error, 3, true);
                            }
                        )
                    });
                }
            },
            error => {
                this.error = new Error("Erreur", error, 3, true);
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    post_message() {
        if (this.new_message.Content == undefined || this.new_message.Content == null || this.new_message.Content.length === 0) {
            this.error = new Error("Erreur", "Un message ne peut pas être vide", 3, true);
            return;
        }
        this.new_message.Forum_id = this.discussion.ID;
        this.forumService.createMessage(this.new_message, this.currentUser["token"]).subscribe(
            result => {
                this.error = new Error("Erreur", "Votre message a été posté", 3, false);
                this.initForumMessage();
                this.hideNewMessageBox();
            },
            error => {
                this.error = new Error("Erreur", error, 3, true);
            }
        )
    }

    private getUserById(idUser: number, index) {
        this.userService.getById(idUser).subscribe(
            resultArray => {
                resultArray = resultArray["results"]["data"][0];
                this.messages[index].User = resultArray;
            }
        )
    }

    private displayNewMessageBox() {
        if (this.currentUser != null) {
            let newMessageBox = document.getElementById("new_message_box");
            newMessageBox.classList.add("show");
        } else {
            this.error = new Error("Erreur", "Vous devez être connecté pour ajouter un message", 3, true);
        }
    }

    private hideNewMessageBox() {
        let newMessageBox = document.getElementById("new_message_box");
        newMessageBox.classList.remove("show");
    }
}
import { Component, OnInit } from '@angular/core';

import { Discussion } from '../../models/discussion';
import { Message } from '../../models/message';
import { User } from '../../models/user';
import { ForumService } from '../../services/forum.service';
import { UserService } from '../../services/user.service';
import { Error } from '../../models/error';

@Component({
    moduleId: module.id,
    styleUrls: [ '../../../assets/css/forum.component.css' ],
    templateUrl: '../../templates/forum.component.html',
    providers: [ForumService, UserService]
})

export class ForumComponent implements OnInit {
    allDiscussions : Discussion[] = [];
    currentUser: any;
    new_discussion: Discussion = new Discussion(0, 0, "", new Date(), "");
    new_message: Message = new Message();
    errorMessage: string = '';
    successMessage: boolean = false;
    usersList: User[] = [];
    allMessage: Message[][] = [];
    private error: Error = null;
    private allTags: any[][] = [];

    constructor(private forumService: ForumService, private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.initForumAndMessage();
    }

    private initForumAndMessage() {
        this.allDiscussions = [];
        this.allMessage = [];
        this.allTags = [];
        this.forumService.getAllDiscussions().subscribe(
            result => {
                if (result["status"] != undefined && result["status"] === "200") {
                    this.allDiscussions = result["topics"];
                }
                let tags: string[] = [];
                for (let i = 0; this.allDiscussions.length > i; i += 1) {
                    let c_date = new Date(this.allDiscussions[i].Creation_date);
                    this.allDiscussions[i].Creation_date = c_date;
                    this.getUser(this.allDiscussions[i].Author_id, i);
                    this.forumService.getMessageByDiscussionID(this.allDiscussions[i].ID).subscribe(
                        result => {
                            if (result["status"] != undefined && result["status"] === "200") {
                                if (result["messages"].length > 0) {
                                    for (let i = 0; i < result["messages"].length; i += 1) {
                                        let m_date = new Date(result["messages"][i]["Creation_date"]);
                                        result["messages"][i]["Creation_date"] = m_date;
                                    }
                                    this.allMessage.push(result["messages"]);
                                } else {
                                    this.allMessage.push(null);
                                }
                            } else {
                                this.allMessage.push(null);
                            }
                        },
                        error => {
                            this.error = new Error("Erreur", error, 3, true);
                        }
                    );
                    let tagsIndex = tags.indexOf(this.allDiscussions[i].Tags);
                    if (tagsIndex > -1) {
                        this.allTags[tagsIndex][1] += 1;
                    } else {
                        tags.push(this.allDiscussions[i].Tags);
                        this.allTags.push([this.allDiscussions[i].Tags, 1]);
                    }
                }
            },
            error => {
                this.error = new Error("Erreur", error, 3, true);
            }
        );
    }

    add_discussion() {
        this.successMessage = false;
        this.errorMessage = '';
        if (this.new_discussion.Name == undefined || this.new_discussion.Name == '' || this.new_discussion.Name == null) {
            this.errorMessage = 'Title canno\'t be empty';
            return;
        }
        if (this.new_message.Content == undefined || this.new_message.Content == null || this.new_message.Content.length == 0) {
            this.errorMessage = 'Message canno\'t be empty';
            return;
        }
        let date = Date.now();
        this.forumService.createDiscussion(this.new_discussion, this.new_message.Content, this.currentUser["token"]).subscribe(
            result => {
                if (result["success"] != undefined && result["success"] === false) {
                    this.error = new Error("Erreur", result["message"], 3, true);
                } else {
                    this.error = new Error("Succès", "La discussion à été créé", 3, false);
                    this.hideNewDiscussionBox();
                    this.initForumAndMessage();
                }
            },
            error => {
                this.error = new Error("Erreur", "Impossible de créer une discussion", 3, true);
            }
        );
    }

    getUser(idUser: number, index: number) {
        this.userService.getById(idUser).subscribe(
            resultArray => {
                if (resultArray["results"]["status"] === 403) {
                    this.allDiscussions[index].User = null;
                } else {
                    resultArray = resultArray["results"]["data"][0];
                    this.allDiscussions[index].User = resultArray;
                }
            }
        )
    }

    private displayNewDiscussionBox() {
        if (this.currentUser != null) {
            let newDiscussionBox = document.getElementById("new_discussion_box");
            newDiscussionBox.classList.add("show");
            let newDiscussionBoxBS = document.getElementById("new_discussion_box_black_screen");
            newDiscussionBoxBS.classList.add("show");
        } else {
            this.error = new Error("Erreur", "Vous devez être connecté pour pouvoir créer une discussion", 3, true);
        }
    }

    private hideNewDiscussionBox() {
        let newDiscussionBox = document.getElementById("new_discussion_box");
        newDiscussionBox.classList.remove("show");
        let newDiscussionBoxBS = document.getElementById("new_discussion_box_black_screen");
        newDiscussionBoxBS.classList.remove("show");
    }
}
import { Component, OnInit } from '@angular/core';

import { Discussion } from '../../models/discussion';
import { Message } from '../../models/message';
import { User } from '../../models/user';
import { ForumService } from '../../services/forum.service';
import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    styleUrls: [ '../../../assets/css/forum.component.css' ],
    templateUrl: '../../templates/forum.component.html',
    providers: [ForumService, UserService]
})

export class ForumComponent implements OnInit {
    allDiscussions : Discussion[];
    currentUser: User;
    new_discussion: any = {};
    new_message: any = {};

    constructor(private forumService: ForumService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.allDiscussions = this.forumService.getAllDiscussions();
    }

    add_discussion() {
        if (this.new_discussion.title == undefined || this.new_discussion.title == "" || this.new_discussion.title == null) {
            alert("Fill title");
            return;
        }
        if (this.new_message.text == undefined || this.new_message.text == "" || this.new_message.text == null) {
            alert("Fill text");
            return;
        }
        let date = Date.now()
        this.new_discussion.id = 0;
        this.new_discussion.author_id = this.currentUser.ID;
        this.new_discussion.nb_response = 0;
        this.new_discussion.last_message = new Date;
        this.new_discussion.last_message.setTime(date);
        this.new_discussion.created = new Date;
        this.new_discussion.created.setTime(date);
        if(this.forumService.createDiscussion(this.new_discussion)) {
            this.new_message.id = 0;
            this.new_message.author_id = this.currentUser.ID;
            this.new_message.post_date = new Date;
            this.new_message.post_date.setTime(date);
            this.new_message.discussion_id = this.new_discussion.id;
            if(this.forumService.createMessage(this.new_message)) {
                alert("Created");
            }
        }
        // this.forumService.createDiscussion(this.new_discussion).subscribe(
        //     data => {
        //         this.new_message.id = 0;
        //         this.new_message.author_id = this.currentUser.id;
        //         this.new_message.post_date = new Date;
        //         this.new_message.post_date.setTime(date);
        //         this.new_message.discussion_id = data.id;
        //         this.ForumService.createMessage(this.new_message).subscribe(
        //             data => {
        //                 alert("created");
        //             },
        //             error => {
        //                 alert("An error occured while creating message");
        //             }
        //         )
        //     },
        //     error => {
        //         alert("An error occured while creating discussion");
        //     }
        // )
    }
}
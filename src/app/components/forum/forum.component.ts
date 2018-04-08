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
    errorMessage: string = '';
    successMessage: boolean = false;

    constructor(private forumService: ForumService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.allDiscussions = this.forumService.getAllDiscussions();
    }

    add_discussion() {
        this.successMessage = false;
        this.errorMessage = '';
        if (this.new_discussion.title == undefined || this.new_discussion.title == '' || this.new_discussion.title == null) {
            this.errorMessage = 'Title canno\'t be empty';
            return;
        }
        if (this.new_message.text == undefined || this.new_message.text == '' || this.new_message.text == null) {
            this.errorMessage = 'Message canno\'t be empty';
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
                this.successMessage = true;
            }
        }
    }
}
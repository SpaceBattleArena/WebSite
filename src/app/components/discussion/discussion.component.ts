import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Discussion } from '../../models/discussion';
import { Message } from '../../models/message';
import { User } from '../../models/user';
import { ForumService } from '../../services/forum.service';
import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    styleUrls: [ '../../../assets/css/discussion.component.css' ],
    templateUrl: '../../templates/discussion.component.html',
    providers: [ForumService, UserService]
})

export class DiscussionComponent implements OnInit, OnDestroy {
    allDiscussions: Discussion[];
    messages: Message[];
    slug: number;
    private sub: any;
    discussion: Discussion;
    test: any = {};
    currentUser: User;
    new_message: any = {};

    constructor(private route: ActivatedRoute, private ForumService: ForumService, private router:Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.allDiscussions = JSON.parse(localStorage.getItem('discussions'));
        this.sub = this.route.params.subscribe(params => {
            this.slug = params['slug'];
        });
        this.allDiscussions.forEach(element => {
            if (element.id == this.slug) {
                this.discussion = element;
            }
        });
        if (this.discussion == undefined) {
            this.router.navigate(['forum']);
        }
        this.messages = this.ForumService.getMessageByDiscussionID(this.discussion.id);
        // this.ForumService.getMessageByDiscussionID(this.discussion.id).subscribe(
        //     data => {
        //         this.messages = data;
        //     },
        //     error => {
        //         alert("An error occured while getting messages");
        //     }
        // )
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    post_message() {
        if (this.new_message.text == undefined || this.new_message.text == null || this.new_message.text == "") {
            alert("The message is empty");
            return;
        }
        this.new_message.id = 0;
        this.new_message.author_id = this.currentUser.ID;
        this.new_message.post_date = Date.now();
        this.new_message.discussion_id = this.discussion.id;
        if(this.ForumService.createMessage(this.new_message)) {
            this.discussion.last_message = this.new_message.post_date;
            this.discussion.nb_response += 1;
            this.ForumService.updateDiscussion(this.discussion);
            this.messages = this.ForumService.getMessageByDiscussionID(this.discussion.id)
        }
        // this.ForumService.createMessage(this.message).subscribe(
        //     data => {
        //         alert("created");
        //         this.discussion.last_message = this.message.post_date;
        //         this.discussion.nb_response += 1;
        //         this.ForumService.updateDiscussion(this.discussion).subscribe(
        //             data => {
        //                 console.log("success");
        //                 console.log(data);
        //             },
        //             error => {
        //                 console.log(error);
        //             }
        //         )
        //         this.ForumService.getMessageByDiscussionID(this.discussion.id).subscribe(
        //             data => {
        //                 this.messages = data;
        //             },
        //             error => {
        //                 alert("An error occured while getting messages");
        //             }
        //         )
        //         this.message.id = 0;
        //         this.message.author_id = null;
        //         this.message.post_date = null;
        //         this.message.discussion_id = null;
        //         this.message.text = "";
        //     },
        //     error => {
        //         alert("An error occured while creating discussion");
        //     }
        // )
    }
}
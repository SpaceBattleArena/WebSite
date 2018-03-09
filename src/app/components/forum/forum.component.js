"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forum_service_1 = require("../../services/forum.service");
var user_service_1 = require("../../services/user.service");
var ForumComponent = /** @class */ (function () {
    function ForumComponent(forumService) {
        this.forumService = forumService;
        this.new_discussion = {};
        this.new_message = {};
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ForumComponent.prototype.ngOnInit = function () {
        this.allDiscussions = this.forumService.getAllDiscussions();
    };
    ForumComponent.prototype.add_discussion = function () {
        if (this.new_discussion.title == undefined || this.new_discussion.title == "" || this.new_discussion.title == null) {
            alert("Fill title");
            return;
        }
        if (this.new_message.text == undefined || this.new_message.text == "" || this.new_message.text == null) {
            alert("Fill text");
            return;
        }
        var date = Date.now();
        this.new_discussion.id = 0;
        this.new_discussion.author_id = this.currentUser.ID;
        this.new_discussion.nb_response = 0;
        this.new_discussion.last_message = new Date;
        this.new_discussion.last_message.setTime(date);
        this.new_discussion.created = new Date;
        this.new_discussion.created.setTime(date);
        if (this.forumService.createDiscussion(this.new_discussion)) {
            this.new_message.id = 0;
            this.new_message.author_id = this.currentUser.ID;
            this.new_message.post_date = new Date;
            this.new_message.post_date.setTime(date);
            this.new_message.discussion_id = this.new_discussion.id;
            if (this.forumService.createMessage(this.new_message)) {
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
    };
    ForumComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            styleUrls: ['../../../../assets/css/forum.component.css'],
            templateUrl: '../../templates/forum.component.html',
            providers: [forum_service_1.ForumService, user_service_1.UserService]
        }),
        __metadata("design:paramtypes", [forum_service_1.ForumService])
    ], ForumComponent);
    return ForumComponent;
}());
exports.ForumComponent = ForumComponent;
//# sourceMappingURL=forum.component.js.map
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
var router_1 = require("@angular/router");
var forum_service_1 = require("../../services/forum.service");
var user_service_1 = require("../../services/user.service");
var DiscussionComponent = /** @class */ (function () {
    function DiscussionComponent(route, ForumService, router) {
        this.route = route;
        this.ForumService = ForumService;
        this.router = router;
        this.test = {};
        this.new_message = {};
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    DiscussionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.allDiscussions = JSON.parse(localStorage.getItem('discussions'));
        this.sub = this.route.params.subscribe(function (params) {
            _this.slug = params['slug'];
        });
        this.allDiscussions.forEach(function (element) {
            if (element.id == _this.slug) {
                _this.discussion = element;
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
    };
    DiscussionComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    DiscussionComponent.prototype.post_message = function () {
        if (this.new_message.text == undefined || this.new_message.text == null || this.new_message.text == "") {
            alert("The message is empty");
            return;
        }
        this.new_message.id = 0;
        this.new_message.author_id = this.currentUser.ID;
        this.new_message.post_date = Date.now();
        this.new_message.discussion_id = this.discussion.id;
        if (this.ForumService.createMessage(this.new_message)) {
            this.discussion.last_message = this.new_message.post_date;
            this.discussion.nb_response += 1;
            this.ForumService.updateDiscussion(this.discussion);
            this.messages = this.ForumService.getMessageByDiscussionID(this.discussion.id);
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
    };
    DiscussionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            styleUrls: ['../../../../assets/css/discussion.component.css'],
            templateUrl: '../../templates/discussion.component.html',
            providers: [forum_service_1.ForumService, user_service_1.UserService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, forum_service_1.ForumService, router_1.Router])
    ], DiscussionComponent);
    return DiscussionComponent;
}());
exports.DiscussionComponent = DiscussionComponent;
//# sourceMappingURL=discussion.component.js.map
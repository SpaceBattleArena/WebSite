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
var http_1 = require("@angular/http");
var ForumService = /** @class */ (function () {
    function ForumService(http) {
        this.http = http;
        this._postsURL = "http://localhost:3000/";
        this.discussions = JSON.parse(localStorage.getItem('discussions')) || [];
        this.messages = JSON.parse(localStorage.getItem('messages')) || [];
    }
    ForumService.prototype.getAllDiscussions = function () {
        return this.discussions;
        //return this.http.get('/api/discussions', this.jwt()).map((response: Response) => response.json());
    };
    ForumService.prototype.getAllMessages = function () {
        return this.messages;
        //return this.http.get('/api/messages', this.jwt()).map((response: Response) => response.json());
    };
    ForumService.prototype.getDiscussionById = function (id) {
        for (var i = 0; i < this.discussions.length; i += 1) {
            if (this.discussions[i].id === id) {
                return this.discussions[i];
            }
        }
        return null;
        //return this.http.get('/api/discussions/' + id, this.jwt()).map((response: Response) => response.json());
    };
    ForumService.prototype.getMessageByDiscussionID = function (id) {
        var messages_list = [];
        for (var i = 0; i < this.messages.length; i++) {
            if (this.messages[i].discussion_id == id) {
                messages_list.push(this.messages[i]);
            }
        }
        return messages_list;
    };
    ForumService.prototype.createDiscussion = function (newDiscussion) {
        var duplicateDiscussion = this.discussions.filter(function (discussion) { return discussion.title === newDiscussion.title; }).length;
        if (duplicateDiscussion) {
            return new Error('Title "' + newDiscussion.title + '" is already taken');
        }
        newDiscussion.id = this.discussions.length + 1;
        this.discussions.push(newDiscussion);
        localStorage.setItem('discussions', JSON.stringify(this.discussions));
        return true;
        //return this.http.post('/api/discussions', discussion, this.jwt()).map((response: Response) => response.json());
    };
    ForumService.prototype.createMessage = function (newMessage) {
        newMessage.id = this.messages.length + 1;
        this.messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(this.messages));
        return true;
        //return this.http.post('/api/messages', message, this.jwt()).map((response: Response) => response.json());
    };
    ForumService.prototype.updateDiscussion = function (discussion) {
        for (var i = 0; i < this.discussions.length; i++) {
            if (this.discussions[i].id == discussion.id) {
                this.discussions[i] = discussion;
            }
        }
        localStorage.setItem('discussions', JSON.stringify(this.discussions));
        return true;
        //return this.http.put('/api/discussions/' + discussion.id, discussion, this.jwt()).map((response: Response) => response.json());
    };
    ForumService.prototype.updateMessage = function (message) {
        //return this.http.put('/api/messages/' + message.id, message, this.jwt()).map((response: Response) => response.json());
    };
    ForumService.prototype.deleteDiscussion = function (id) {
        for (var i = 0; i < this.discussions.length; i++) {
            var discussion = this.discussions[i];
            if (discussion.id === id) {
                // delete user
                this.discussions.splice(i, 1);
                localStorage.setItem('discussions', JSON.stringify(this.discussions));
                break;
            }
        }
        return true;
        //return this.http.delete('/api/discussions/' + id, this.jwt()).map((response: Response) => response.json());
    };
    ForumService.prototype.deleteMessage = function (id) {
        for (var i = 0; i < this.messages.length; i++) {
            var message = this.messages[i];
            if (message.id === id) {
                this.messages.splice(i, 1);
                localStorage.setItem('messages', JSON.stringify(this.messages));
                break;
            }
        }
        return true;
        //return this.http.delete('/api/messages/' + id, this.jwt()).map((response: Response) => response.json());
    };
    ForumService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ForumService);
    return ForumService;
}());
exports.ForumService = ForumService;
//# sourceMappingURL=forum.service.js.map
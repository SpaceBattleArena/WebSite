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
var Observable_1 = require("rxjs/Observable");
require("rxjs/Rx");
var ArticleService = /** @class */ (function () {
    function ArticleService(http) {
        this.http = http;
        this._postsURL = "http://localhost:3000/";
        this.articles = JSON.parse(localStorage.getItem('articles')) || [];
    }
    ArticleService.prototype.getAll = function () {
        return this.http
            .get(this._postsURL + "article/getAll")
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    ArticleService.prototype.getById = function (id) {
        return this.articles.filter(function (article) { return article.id === id; });
    };
    ArticleService.prototype.getBySlug = function (slug) {
        return this.articles.filter(function (article) { return article.slug === slug; });
    };
    ArticleService.prototype.create = function (new_article) {
        var data = new http_1.URLSearchParams();
        data.append("title", JSON.parse(new_article).title);
        data.append("description", JSON.parse(new_article).description);
        data.append("image", JSON.parse(new_article).image);
        return this.http
            .post(this._postsURL + "article/create", data)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    ArticleService.prototype.update = function (article) {
        var body = {
            "id": article.ID,
            "title": article.Title,
            "description": article.Description,
            "image": article.Image
        };
        return this.http.put(this._postsURL + "article/update", body)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    ArticleService.prototype.delete = function (id) {
        var body = {
            "id": id
        };
        return this.http.delete(this._postsURL + "article/delete", { body: body })
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    ArticleService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.statusText);
    };
    ArticleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ArticleService);
    return ArticleService;
}());
exports.ArticleService = ArticleService;
//# sourceMappingURL=news.service.js.map
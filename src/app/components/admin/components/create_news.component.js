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
// import { Article } from '../../../_models/index';
// import { AlertService, ArticleService } from '../../../_services/index';
var CreateNewsComponent = /** @class */ (function () {
    function CreateNewsComponent() {
        // allArticles: Article[];
        this.new_article = {};
        this.body_values = [];
        // this.allArticles = JSON.parse(localStorage.getItem('articles'));
        // this.allArticles.forEach(article => {
        //   this.add_article_to_list(article);
        // });
    }
    CreateNewsComponent.prototype.add_article = function () {
        // if (!this.new_article.title || !this.new_article.description || !this.new_article.image.url) {
        //   alert("Fill all inputs");
        //   return;
        // }
        // this.new_article.id = 0;
        // if (this.allArticles != null) {
        //   this.allArticles.forEach(element => {
        //     if (element.id == this.new_article.id) {
        //       this.new_article.id += 1;
        //     }
        //   });
        // }
        // this.new_article.slug = this.new_article.title.replace(" ", "-");
        // this.articleService.create(this.new_article)
        //   .subscribe(
        //     data => {
        //       alert('Creation success');
        //       //this.add_user_to_list(this.new_article);
        //       let news_list_block = document.getElementById('news-list');
        //       news_list_block.style.display = 'block';
        //       let create_news_block = document.getElementById('create-news');
        //       create_news_block.style.display = 'none';
        //     },
        //     error => {
        //       alert('Error while creation');
        //   });
    };
    CreateNewsComponent.prototype.add_article_to_list = function () {
        // this.value = [
        //   article.id.toString(), article.title, article.description,
        //   article.image
        // ];
        // this.body_values.push(this.value);
    };
    CreateNewsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'create-news',
            styleUrls: ['../../../../../assets/css/create_news.component.css'],
            templateUrl: '../../../templates/create_news.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], CreateNewsComponent);
    return CreateNewsComponent;
}());
exports.CreateNewsComponent = CreateNewsComponent;
//# sourceMappingURL=create_news.component.js.map
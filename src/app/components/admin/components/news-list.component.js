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
var article_1 = require("../../../models/article");
var news_service_1 = require("../../../services/news.service");
var NewsListComponent = /** @class */ (function () {
    function NewsListComponent(articleService) {
        this.articleService = articleService;
        this.new_article = new article_1.Article();
        this.head_values = [
            'id', 'title', 'description', 'image', 'slug'
        ];
        this.body_values = [];
    }
    NewsListComponent.prototype.add_article_to_list = function (article) {
        this.value = [
            article.ID, article.Title, article.Description,
            article.Image, article.slug
        ];
        this.body_values.push(this.value);
    };
    NewsListComponent.prototype.add_article = function () {
        var _this = this;
        this.new_article.Image = "../../assets/img/example-news.png";
        if (!this.new_article.Title || !this.new_article.Description || !this.new_article.Image) {
            alert("Fill all inputs");
            return;
        }
        if (this.new_article.ID != undefined || this.new_article.ID != null) {
            this.articleService.create(JSON.stringify(this.new_article))
                .subscribe(function (data) {
                alert('Creation success');
                _this.get_all_articles();
                var news_list_block = document.getElementById('create-news_id');
                news_list_block.style.display = 'none';
                _this.new_article = new article_1.Article();
            }, function (error) {
                alert('Error while creation');
            });
        }
        else {
            this.articleService.update(this.new_article)
                .subscribe(function (resultArray) {
                _this.get_all_articles();
                alert("update successfull");
            }, function (error) {
                console.log(error);
            });
        }
    };
    NewsListComponent.prototype.toggle_add_news = function () {
        var create_news_block = document.getElementById("create-news_id");
        if (create_news_block.style.display == "none") {
            create_news_block.style.display = "block";
        }
        else {
            create_news_block.style.display = "none";
        }
    };
    NewsListComponent.prototype.modify = function (values, index) {
        this.new_article.ID = Number(values[0]);
        this.new_article.Title = values[1];
        this.new_article.Description = new Text(values[2]);
        this.new_article.Image = values[3];
        var news_list_block = document.getElementById('create-news_id');
        news_list_block.style.display = 'block';
    };
    NewsListComponent.prototype.delete = function (id) {
        var _this = this;
        this.articleService.delete(id)
            .subscribe(function (data) {
            alert('Article deleted');
            _this.get_all_articles();
        }, function (error) {
            alert('Error while deleting');
        });
    };
    NewsListComponent.prototype.get_all_articles = function () {
        var _this = this;
        this.body_values = [];
        this.articleService.getAll()
            .subscribe(function (resultArray) {
            _this.allArticles = resultArray["results"]["data"];
            for (var i = 0; i < _this.allArticles.length; i += 1) {
                _this.allArticles[i].slug = _this.allArticles[i]["Title"];
                _this.allArticles[i].slug = _this.allArticles[i].slug.toString().toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '');
            }
            _this.allArticles.forEach(function (article) {
                _this.add_article_to_list(article);
            });
        }, function (error) {
            console.log(error);
        });
    };
    NewsListComponent.prototype.ngOnInit = function () {
        this.get_all_articles();
    };
    NewsListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'news-list',
            styleUrls: ['../../../../../assets/css/news-list.component.css'],
            templateUrl: '../../../templates/news-list.component.html',
            providers: [news_service_1.ArticleService]
        }),
        __metadata("design:paramtypes", [news_service_1.ArticleService])
    ], NewsListComponent);
    return NewsListComponent;
}());
exports.NewsListComponent = NewsListComponent;
//# sourceMappingURL=news-list.component.js.map
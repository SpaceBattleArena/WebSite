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
var news_service_1 = require("../../services/news.service");
var AllNewsComponent = /** @class */ (function () {
    function AllNewsComponent(articleService) {
        this.articleService = articleService;
    }
    AllNewsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleService.getAll()
            .subscribe(function (resultArray) {
            console.log(resultArray);
            if (resultArray["results"]["status"] === 200) {
                _this.allArticles = resultArray["results"]["data"];
                for (var i = 0; _this.allArticles.length > i; i += 1) {
                    _this.allArticles[i].slug = _this.allArticles[i].Title.toString().toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w\-]+/g, '')
                        .replace(/\-\-+/g, '-')
                        .replace(/^-+/, '')
                        .replace(/-+$/, '');
                }
                _this.allArticles.reverse();
            }
        });
    };
    AllNewsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            styleUrls: ['../../../../assets/css/all-news.component.css'],
            templateUrl: '../../templates/all_news.component.html',
            providers: [news_service_1.ArticleService]
        }),
        __metadata("design:paramtypes", [news_service_1.ArticleService])
    ], AllNewsComponent);
    return AllNewsComponent;
}());
exports.AllNewsComponent = AllNewsComponent;
//# sourceMappingURL=all_news.component.js.map
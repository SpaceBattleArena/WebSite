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
var user_service_1 = require("../../../services/user.service");
var news_service_1 = require("../../../services/news.service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(articleService, userService) {
        this.articleService = articleService;
        this.userService = userService;
        this.loading = true;
        this.rank_player = [
            ['Rookie', 0, 0, 0, 0],
            ['2nd Lieutenant', 0, 0, 0, 0],
            ['1st Lieutenant', 0, 0, 0, 0],
            ['Captain', 0, 0, 0, 0],
            ['Major', 0, 0, 0, 0],
            ['Lieutenant Colonel', 0, 0, 0, 0],
            ['Colonel', 0, 0, 0, 0],
            ['Brigadier General', 0, 0, 0, 0],
            ['Major General', 0, 0, 0, 0],
            ['Lieutenant-General', 0, 0, 0, 0],
            ['General', 0, 0, 0, 0],
            ['General of the Army', 0, 0, 0, 0],
        ];
        this.ranks_names = [
            ['Rookie', 0],
            ['2nd Lieutenant', 100],
            ['1st Lieutenant', 200],
            ['Captain', 300],
            ['Major', 400],
            ['Lieutenant Colonel', 500],
            ['Colonel', 600],
            ['Brigadier General', 700],
            ['Major General', 800],
            ['Lieutenant-General', 900],
            ['General', 1000],
            ['General of the Army', 1100],
        ];
        this.arena_player = [
            ['Arena 1', 0, 0, 0, 0],
            ['Arena 2', 0, 0, 0, 0],
            ['Arena 3', 0, 0, 0, 0],
            ['Arena 4', 0, 0, 0, 0],
            ['Arena 5', 0, 0, 0, 0],
            ['Arena 6', 0, 0, 0, 0],
            ['Arena 7', 0, 0, 0, 0],
            ['Arena 8', 0, 0, 0, 0],
        ];
        this.arena_names = [
            ['Arena 1', 0],
            ['Arena 2', 1],
            ['Arena 3', 2],
            ['Arena 4', 3],
            ['Arena 5', 4],
            ['Arena 6', 5],
            ['Arena 7', 6],
            ['Arena 8', 7],
        ];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleService.getAll()
            .subscribe(function (resultArray) {
            _this.allArticles = resultArray["results"]["data"];
            _this.count_articles = _this.allArticles.length;
            _this.userService.getAll()
                .subscribe(function (resultArray) {
                _this.allUsers = resultArray["results"]["data"];
                _this.count_user = _this.allUsers.length;
                _this.count_rank_player();
                _this.count_arena();
                _this.loading = false;
            });
        });
    };
    DashboardComponent.prototype.count_rank_player = function () {
        var index = 0;
        for (var i = 0; i < this.allUsers.length; i += 1) {
            index = 0;
            while (index < this.ranks_names.length) {
                if (index + 1 < this.ranks_names.length) {
                    if (this.allUsers[i].Rank_id >= this.ranks_names[index][1] && this.allUsers[i].Rank_id < this.ranks_names[index + 1][1]) {
                        this.rank_player[index][1] += 1;
                        this.rank_player[index][2] = this.rank_player[index][1] * 20;
                        this.rank_player[index][3] = 30 + (50 * index);
                        this.rank_player[index][4] = 215 - (this.rank_player[index][1] * 20);
                    }
                }
                else {
                    if (this.allUsers[i].Rank_id >= this.ranks_names[index][1]) {
                        this.rank_player[index][1] += 1;
                        this.rank_player[index][2] = this.rank_player[index][1] * 20;
                        this.rank_player[index][3] = 30 + (50 * index);
                        this.rank_player[index][4] = 215 - (this.rank_player[index][1] * 20);
                    }
                }
                index += 1;
            }
        }
        var html = "";
        for (var i = 0; i < this.rank_player.length; i++) {
            html += '<rect width="25" height="' +
                this.rank_player[i][2] +
                '" x="' + this.rank_player[i][3] +
                '" y="' + this.rank_player[i][4] +
                '" class="dashboard__charts-bar__svg__text__bar__rect" style="fill: red;"></rect>';
        }
        var bar_balise = document.getElementById("bar_player");
        bar_balise.innerHTML = html;
    };
    DashboardComponent.prototype.count_arena = function () {
        var _this = this;
        var index = 0;
        this.allUsers.forEach(function (user) {
            index = 0;
            while (index < _this.arena_names.length) {
                if (user.Arena_id == _this.arena_names[index][1]) {
                    _this.arena_player[index][1] += 1;
                    _this.arena_player[index][2] = _this.arena_player[index][1] * 20;
                    _this.arena_player[index][3] = 30 + (50 * index);
                    _this.arena_player[index][4] = 215 - (_this.arena_player[index][1] * 20);
                }
                index += 1;
            }
        });
        var html = "";
        for (var i = 0; i < this.arena_player.length; i++) {
            html += '<rect width="25" height="' +
                this.arena_player[i][2] +
                '" x="' + this.arena_player[i][3] +
                '" y="' + this.arena_player[i][4] +
                '" class="dashboard__charts-bar__svg__text__bar__rect" style="fill:red;"></rect>';
        }
        var bar_balise = document.getElementById("bar_arena");
        bar_balise.innerHTML = html;
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard',
            styleUrls: ['../../../../../assets/css/dashboard.component.css'],
            templateUrl: '../../../templates/dashboard.component.html',
            providers: [user_service_1.UserService, news_service_1.ArticleService]
        }),
        __metadata("design:paramtypes", [news_service_1.ArticleService, user_service_1.UserService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map
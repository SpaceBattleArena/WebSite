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
var HomeComponent = /** @class */ (function () {
    function HomeComponent(articleService) {
        this.articleService = articleService;
        this.ArticlesLimit = [];
        this.translateXShip = 0;
        this.translateYShip = 0;
        this.rotateShip = 0;
        this.pos_screens = 30;
    }
    HomeComponent.prototype.sleep = function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    };
    HomeComponent.prototype.display_home = function () {
        var value = 0;
        var id = setInterval(frame, 8);
        var mask_top = document.getElementById('mask_top');
        var mask_bottom = document.getElementById('mask_bottom');
        var explore = document.getElementById('explore');
        var spaceship = document.getElementById('spaceship');
        mask_top.style.opacity = '1';
        mask_bottom.style.opacity = '1';
        explore.style.opacity = '1';
        function frame() {
            if (value == 100) {
                clearInterval(id);
                mask_top.style.opacity = '0';
                mask_bottom.style.opacity = '0';
            }
            else {
                value++;
                mask_top.style.transform = "translateX(" + value * 1.1 + "%)";
                mask_bottom.style.transform = "translateX(" + value * 1.4 + "%)";
                spaceship.style.opacity = (value / 100).toString();
            }
        }
    };
    HomeComponent.prototype.when_loading = function () {
        var value = 0;
        var id = setInterval(frame, 8, this);
        var girl = document.getElementById('girl');
        var window_elem = document.getElementById('window');
        var loading_bar = document.getElementById('loading-bar');
        var main = document.getElementById('main');
        var sc_heading = document.getElementById('sc_heading');
        var nav = document.getElementById('nav');
        var moon = document.getElementById('the-moon-below');
        var moon_mobile = document.getElementById('the-moon-below-mobile');
        var ship = document.getElementById("spaceship");
        var loading_section = document.getElementById("loading_section");
        nav.style.opacity = "0";
        function frame(func) {
            if (value == 100) {
                clearInterval(id);
                girl.style.opacity = "0";
                window_elem.style.opacity = "0";
                loading_section.style.display = "none";
                loading_bar.style.opacity = "0";
                main.style.opacity = "1";
                sc_heading.style.opacity = "1";
                ship.style.opacity = "1";
                func.display_home();
            }
            else {
                value++;
                girl.style.transform = "translateX(" + value / 3 + "vw)";
                window_elem.style.transform = "translateX(" + value / 4 + "vw) scaleX(" + value * 0.045 + ") scaleY(" + value * 0.045 + ")";
                loading_bar.style.transform = "scaleX(" + value / 100 + ")";
                moon.style.transform = "translateX(" + ((value / 2) - 50) + "vw)";
                moon_mobile.style.transform = "translateX(" + ((value / 2) - 50) + "vw)";
                nav.style.opacity = (value / 100).toString();
            }
        }
    };
    HomeComponent.prototype.move_ship = function (e) {
        var ship = document.getElementById("spaceship");
        var ship_size_x = ship.offsetWidth;
        var ship_size_y = ship.offsetHeight;
        var x = e.clientX;
        var y = e.clientY;
        var window_x = window.innerWidth;
        var window_y = window.innerHeight;
        var pos_ship_x = ship.offsetLeft;
        var document_height = document.body.clientHeight;
        var pos_ship_y = document_height * 0.1;
        if (x > pos_ship_x + (ship_size_x / 2)) {
            if (this.translateXShip > -15) {
                this.translateXShip -= 0.1;
            }
            if (this.rotateShip > -3) {
                this.rotateShip -= 0.05;
            }
        }
        else {
            if (this.translateXShip < 15) {
                this.translateXShip += 0.1;
            }
            if (this.rotateShip < 3) {
                this.rotateShip += 0.05;
            }
        }
        var pos_invert = ((((pos_ship_y + (ship_size_y / 2)) * 100) / document_height) / 100) * window_y;
        if (y > pos_invert) {
            if (this.translateYShip > -15) {
                this.translateYShip -= 0.1;
            }
        }
        else {
            if (this.translateYShip < 15) {
                this.translateYShip += 0.1;
            }
        }
        ship.style.transform = "translateX(" + this.translateXShip + "px) translateY(" + this.translateYShip + "px) rotateZ(" + this.rotateShip + "deg)";
        document.getElementById('the-moon-below').style.transform = "rotateZ(" + (this.rotateShip * (-1)) + "deg)";
        document.getElementById('the-moon-below-mobile').style.transform = "rotateZ(" + (this.rotateShip * (-1)) + "deg)";
    };
    // @HostListener("window:scroll", [])
    // on_scroll() {
    //     let screens = document.getElementById('screens');
    //     let screensPosX = screens.offsetTop - screens.scrollTop + screens.clientTop;
    //     let scroll = document.documentElement.scrollTop;
    //     console.log('screens.offsetTop : ' + screens.offsetTop);
    //     console.log('screens.scrollTop : ' + screens.scrollTop);
    //     console.log('screens.clientTop : ' + screens.clientTop);
    //     console.log('scroll : ' + scroll);
    //     console.log('calc : ' + (screensPosX + (document.body.clientHeight * 0.1)));
    //     if (scroll > screensPosX + (document.body.clientHeight * 0.1)) {
    //         if (this.pos_screens > 0) {
    //             this.pos_screens -= 1;
    //             document.getElementById("screens-1").style.transform = "translateX(" + this.pos_screens + "vw)";
    //             document.getElementById("screens-2").style.transform = "translateX(" + this.pos_screens + "vw)";
    //         }
    //     }
    // }
    HomeComponent.prototype.on_scroll = function () {
        var scroll = document.documentElement.scrollTop;
        document.getElementById("vr_heading").style.transform = "translateX(" + (scroll / 100) + "vw)";
        document.getElementById("card_heading").style.transform = "translateX(" + (scroll / 100) + "vw)";
        document.getElementById("esport_heading").style.transform = "translateX(" + (scroll / 100) + "vw)";
        document.getElementById("war_heading").style.transform = "translateX(" + (scroll / 100) + "vw)";
    };
    HomeComponent.prototype.vr_click = function () {
        console.log('click vr');
        $('#vr').addClass("w--tab-active");
        $('#card').removeClass("w--tab-active");
        $('#e-sport').removeClass("w--tab-active");
        $('#war').removeClass("w--tab-active");
    };
    HomeComponent.prototype.card_click = function () {
        console.log('click card');
        $('#vr').addClass("w--tab-active");
        $('#card').removeClass("w--tab-active");
        $('#e-sport').removeClass("w--tab-active");
        $('#war').removeClass("w--tab-active");
    };
    HomeComponent.prototype.war_click = function () {
        console.log('click war');
        $('#vr').addClass("w--tab-active");
        $('#card').removeClass("w--tab-active");
        $('#e-sport').removeClass("w--tab-active");
        $('#war').removeClass("w--tab-active");
    };
    HomeComponent.prototype.esport_click = function () {
        console.log('click esport');
        $('#vr').addClass("w--tab-active");
        $('#card').removeClass("w--tab-active");
        $('#e-sport').removeClass("w--tab-active");
        $('#war').removeClass("w--tab-active");
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sleep(1500);
        this.when_loading();
        this.articleService.getAll()
            .subscribe(function (resultArray) {
            if (resultArray["results"]["status"] === 200) {
                _this.allArticles = resultArray["results"]["data"];
                var count = _this.allArticles.length;
                if (count >= 4) {
                    _this.ArticlesLimit = [_this.allArticles[count - 1], _this.allArticles[count - 2], _this.allArticles[count - 3], _this.allArticles[count - 4]];
                }
                else {
                    _this.ArticlesLimit = _this.allArticles;
                }
                for (var i = 0; _this.ArticlesLimit.length > i; i += 1) {
                    _this.ArticlesLimit[i].slug = _this.ArticlesLimit[i].Title.toString().toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w\-]+/g, '')
                        .replace(/\-\-+/g, '-')
                        .replace(/^-+/, '')
                        .replace(/-+$/, '');
                }
                var article_image = document.getElementById("article_image_0");
                article_image.style.backgroundImage = "url(localhost:3000/" + _this.ArticlesLimit[0].Slug + ")";
                article_image = document.getElementById("article_image_1");
                article_image.style.backgroundImage = "url(localhost:3000/" + _this.ArticlesLimit[1].Slug + ")";
                article_image = document.getElementById("article_image_2");
                article_image.style.backgroundImage = "url(localhost:3000/" + _this.ArticlesLimit[2].Slug + ")";
                article_image = document.getElementById("article_image_3");
                article_image.style.backgroundImage = "url(localhost:3000/" + _this.ArticlesLimit[3].Slug + ")";
                // this.sleep(1500);
                // this.when_loading();
            }
        });
    };
    __decorate([
        core_1.HostListener("window:scroll", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], HomeComponent.prototype, "on_scroll", null);
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            styleUrls: ['../../../../../assets/css/home.component.css'],
            templateUrl: '../../templates/home.component.html',
            providers: [news_service_1.ArticleService]
        }),
        __metadata("design:paramtypes", [news_service_1.ArticleService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map
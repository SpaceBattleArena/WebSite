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
var user_service_1 = require("../../services/user.service");
var user_1 = require("../../models/user");
var card_service_1 = require("../../services/card.service");
var ProfilComponent = /** @class */ (function () {
    function ProfilComponent(userService, cardService) {
        this.userService = userService;
        this.cardService = cardService;
        this.user = new user_1.User();
        this.is_disabled = true;
        this.cards = [];
        this.decks = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.userService.getById(this.currentUser.id).subscribe(user => { this.user = user; });
    }
    ProfilComponent.prototype.activate_modifications = function () {
        this.is_disabled = false;
    };
    // modify() {
    //     this.userService.update(this.currentUser);
    //     this.is_disabled = true;
    // }
    ProfilComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.currentUser) {
            this.userService.getInformation(this.currentUser["token"])
                .subscribe(function (resultArray) {
                _this.user = resultArray["results"]["data"][0];
            });
            this.cardService.getCards(this.currentUser["token"])
                .subscribe(function (resultArray) {
                _this.cards = resultArray["results"]["cards"];
            });
            this.cardService.getDecks(this.currentUser["token"])
                .subscribe(function (resultArray) {
                _this.decks = resultArray["results"]["decks"];
                console.log(resultArray);
            });
            this.cardService.getRank(this.currentUser["token"])
                .subscribe(function (resultArray) {
                _this.rank = resultArray["results"]["data"];
                console.log(resultArray);
            });
        }
    };
    ProfilComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            styleUrls: ['../../../../assets/css/profil.component.css'],
            templateUrl: '../../templates/profil.component.html',
            providers: [user_service_1.UserService, card_service_1.CardService]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, card_service_1.CardService])
    ], ProfilComponent);
    return ProfilComponent;
}());
exports.ProfilComponent = ProfilComponent;
//# sourceMappingURL=profil.component.js.map